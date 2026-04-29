import React, { useState, useEffect } from "react";
import "./Sections.css";
import { clientRoutes } from "../routes/client.routes";
import { SectionButton } from "./section-button/section-button";
import { Container } from "./shared/container/container";
import { SectionsCard } from "./sections-card/sections-card";
import { MarkedBlock } from "./shared/marked-block/marked-block";
import { SwiperSlide, Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
function Sections() {
  const [activeSection, setActiveSection] = useState(null);
  const [tours, setTours] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем туры и страны
  useEffect(() => {
    Promise.all([
      fetch(clientRoutes.getTours).then(res => res.json()),
      fetch(clientRoutes.getCountries).then(res => res.json())
    ])
      .then(([toursData, countriesData]) => {
        console.log("Туры из Strapi:", toursData);
        console.log("Страны из Strapi:", countriesData);
        setTours(toursData.data);
        setCountries(countriesData.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, []);

  // Фильтруем туры, исключая Китай (id !== 5)
  const filterChinessToures = tours?.filter((item) => item.country?.id !== 5);

  // Получаем уникальные страны из отфильтрованных туров
  const returnUniqCountry = (tours) => {
    const seenIds = new Set();
    const uniqueCountries = [];

    tours?.forEach((tour) => {
      const country = tour.country;
      if (country && !seenIds.has(country.id)) {
        seenIds.add(country.id);
        uniqueCountries.push(country);
      }
    });

    return uniqueCountries;
  };

  const uniqCountries = returnUniqCountry(filterChinessToures);
  
  // Устанавливаем активную страну по умолчанию
  useEffect(() => {
    if (uniqCountries.length > 0 && !activeSection) {
      setActiveSection(uniqCountries[0].id);
    }
  }, [uniqCountries, activeSection]);

  // Находим активную страну (с полными данными)
  const activeCountryData = countries.find(c => c.id === activeSection);
  
  // Фоновое изображение: берём первое изображение из Image (если есть)
  // Так как Image у тебя Multiple Media, используем первый элемент
  const backgroundImageUrl = activeCountryData?.Image?.[0]?.url 
    ? `http://localhost:1337${activeCountryData.Image[0].url}`
    : null;

  if (loading) {
    return <div className="loading">Загрузка туров...</div>;
  }

  return (
    <>
      <div>
        <Container>
          <div className="section_header">
            <h3 className="section_header_title">
              Популярные туры в другие страны
            </h3>
            <div className="section_header_buttons">
              {uniqCountries.map((item) => (
                <SectionButton
                  onClick={() => setActiveSection(item.id)}
                  key={item.id}
                  isActive={item.id === activeSection}
                >
                  {item.Title}
                </SectionButton>
              ))}
            </div>
          </div>

          {/* Блок с динамическим фоном из Strapi (используем Image[0]) */}
          <div 
            className="sections_other"
            style={{
              backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: backgroundImageUrl ? 'transparent' : '#e0e0e0'
            }}
          >
            <div>
              {uniqCountries.length > 0 && activeSection !== null && (
                <h3
                  style={{ textAlign: "center" }}
                  className="section_header_title"
                >
                  {uniqCountries.find(c => c.id === activeSection)?.Title}
                </h3>
              )}
              {uniqCountries.length > 0 && activeSection !== null && (
                <div className="section_info">
                  <MarkedBlock
                    value={uniqCountries.find(c => c.id === activeSection)?.Description}
                  />
                </div>
              )}
            </div>
            <div>
              <h3
                style={{ textAlign: "center" }}
                className="section_header_title"
              >
                Доступные туры
              </h3>
              <div className="sections_other_tours">
                <Swiper pagination= {{
                  type: "fraction",
                  horizontalClass: "sections_other_pagination"
                }} spaceBetween={10} modules={[Pagination]} slidesPerView={'auto'}>
                  {filterChinessToures
                    ?.filter((tour) => tour.country?.id === activeSection)
                    ?.map((card, index) => (
                      <SwiperSlide key={index}>
                        <SectionsCard tour={card} />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Sections;