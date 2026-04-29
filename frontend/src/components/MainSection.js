import React, { useState, useEffect, useRef } from "react";
import "./MainSection.css";
import Shanhai from "../images2/Shanhai4k.jpg";
import image2 from "../images2/image2.jpg";
import image3 from "../images2/image3.jpg";
import image4 from "../images2/image4.jpg";
import { Container } from "./shared/container/container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ArrowRight } from "../icons/right-arrow-icon";
import { BASE_URL, clientRoutes } from "../routes/client.routes";
const MainSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState(null);
  const swiperRef = useRef(null);
  const images = [Shanhai, image2, image3, image4];
  const [swiperInit, setSwiperInit] = useState(false);

  const handleSlideChange = (direction) => {
    if (swiperRef.current) {
      if (direction === "right") {
        swiperRef.current.swiper.slideNext();
      }
      if (direction === "left") {
        swiperRef.current.swiper.slidePrev();
      }
    }
  };

  const getBanners = async () => {
    try {
      const response = await fetch(clientRoutes.getBanners, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setBanners(data.data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const initPagination = () => {
    document.querySelector(".swiper_pagination_wrapper").style.display = "flex";
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Смена каждые 5 секунд
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Container>
      <div className="main-section">
        <div className="main_section_navbar">
          <button
            onClick={() => handleSlideChange("left")}
            className="main_section_navbar_item navbar_arrow_left"
          >
            <ArrowRight />
          </button>
          <button
            onClick={() => handleSlideChange("right")}
            className="main_section_navbar_item"
          >
            <ArrowRight />
          </button>
        </div>
        {banners && (
          <Swiper
            autoplay={{
              delay: 5000,
            }}
            onInit={(swiper) => initPagination()}
            speed={900}
            pagination={{
              horizontalClass: "swiper_pagination_wrapper",
              bulletClass: "swiper_pagination_bullet",
              bulletActiveClass: "swiper_pagination_bullet-active",
            }}
            modules={[Autoplay, Pagination]}
            loop
            ref={swiperRef}
            spaceBetween={30}
            className="main_section_swiper"
          >
            {banners.map((slide, idx) => (
              <SwiperSlide className="main_section_slide" key={idx}>
                <div>
                  <img
                    className="mainSection_image"
                    src={BASE_URL + slide.Photo[0].url}
                  />
                  <div className="content">
                    <div className="main_banner_slide_content">
                      <h1 className="title">{slide.Title}</h1>
                      <p className="subtitle">{slide.Description}</p>
                      <button className="learn-more-button">
                        Узнать больше
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </Container>
  );
};

export default MainSection;
