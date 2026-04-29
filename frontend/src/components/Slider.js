import React, { useEffect, useState, useRef } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import "./Slider.css";
import { ArrowRight } from "../icons/right-arrow-icon";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import { Pagination, Scrollbar, A11y } from "swiper";
import { Container } from "./shared/container/container";
import MovieModal from "./MovieModal";
import { formatPrice } from "../utils/priceConverter";
import { BASE_URL, clientRoutes } from "../routes/client.routes";

const Slider = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const swiperRef = useRef(null);

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
  // Загружаем туры из Strapi (только Китай)
  useEffect(() => {
    fetch(clientRoutes.getTours)
      .then((res) => res.json())
      .then((data) => {
        // Фильтруем только туры по Китаю
        const chinaTours = data.data.filter(
          (tour) => tour.country?.Title === "Китай",
        );
        console.log("Туры по Китаю:", chinaTours);
        setTours(chinaTours);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки туров:", err);
        setLoading(false);
      });
  }, []);

  const handleTicketClick = (tour) => {
    console.log("Открываем тур:", tour); // Добавь для проверки
    setSelectedTour(tour);
    setIsModalOpen(true);
};

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTour(null);
  };

  if (loading) {
    return (
      <div className="cinema-schedule">
        <h2 className="schedule-title" data-aos="fade-up">
          Туры по Китаю
        </h2>
        <div className="loading-slider">Загрузка туров...</div>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="cinema-schedule">
        <h2 className="schedule-title" data-aos="fade-up">
          Туры по Китаю
        </h2>
        <div className="no-movies">Нет доступных туров по Китаю</div>
      </div>
    );
  }

  return (
    <div className="cinema-schedule">
      <h2 className="schedule-title">Туры по Китаю</h2>
      <Container className={"cinema_container"}>
        <div className="cinema-schedule_navbar">
          <button
            onClick={() => handleSlideChange("left")}
            className="cinema-schedule_navbar_item navbar_arrow_left"
          >
            <ArrowRight />
          </button>
          <button
            onClick={() => handleSlideChange("right")}
            className="cinema-schedule_navbar_item"
          >
            <ArrowRight />
          </button>
        </div>
        <Swiper
          ref={swiperRef}
          spaceBetween={20}
          slidesPerView={1}
          loop
          centeredSlides
          pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          a11y={{ enabled: true }}
          className="movie-swiper"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 15 }, // телефоны
            640: { slidesPerView: 2, spaceBetween: 20 }, // планшеты
            992: { slidesPerView: 3, spaceBetween: 20 }, // ноутбуки и выше
            1200: { slidesPerView: 3, spaceBetween: 25 }, // большие экраны
          }}
        >
          {tours.map((tour) => (
            <SwiperSlide key={tour.id}>
              <div className="movie-card">
                <img
                  src={
                    tour.Image?.[0]
                      ? `${BASE_URL +  tour.Image[0].url}`
                      : "/images/slide3.webp"
                  }
                  alt={tour.Title}
                  className="movie-poster"
                />
                <div className="movie-info">
                  <h3 className="movie-title">{tour.Title}</h3>
                  <p className="movie-duration">
                    Длительность: {tour.Duration || tour.DurationDays} дней
                  </p>
                  <p className="movie-price">
                    от {formatPrice(tour.MinPrice) || tour.Stoimost_rub}
                  </p>
                </div>
                <button
                  className="ticket-button"
                  onClick={() => handleTicketClick(tour)}
                >
                  Узнать больше
                </button>
                {/* <svg className="heart-icon" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Модальное окно для тура */}
      {isModalOpen && selectedTour && (
        <MovieModal tour={selectedTour} onClose={closeModal} />
      )}
    </div>
  );
};

export default Slider;
