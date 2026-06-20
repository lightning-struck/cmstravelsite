import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { BASE_URL, clientRoutes } from "../../../routes/client.routes";
import styles from "./TemplateTour.module.css";
import cn from "classnames";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import BookingForm from "../../BookingForm";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import AnimateHeight from "react-animate-height";
const TemplateTour = ({ tour }) => {
  const [activeTab, setActiveTab] = useState("description");
  const [isOpenModal, setOpenModal] = useState(false);
  // Нормализуем данные из Strapi
  const tourData = tour.attributes || tour;
  const images = tourData.Image?.url || tourData.Image || [];
  const hotels = tourData.hotels?.map((item) => item.attributes || item) || [];
  const country =
    tourData.country?.data?.attributes ||
    tourData.country?.attributes ||
    tourData.country;

  const formRef = useOutsideClick(() => {
    setOpenModal(false);
  });
  const [tours, setTours] = useState([]);

  useEffect(() => {
    fetch(clientRoutes.getTours)
      .then((res) => res.json())
      .then((data) => {
        setTours(data.data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки туров:", err);
      });
  }, []);
  const [isVisible, setVisible] = useState(false);
  return (
    <>
      <div className={cn(styles.modal, isOpenModal && styles.open)}>
        <div ref={formRef} className={styles.modal_wrapper}>
          <BookingForm tours={tours} className={styles.form} />
          <button className={styles.close} onClick={() => setOpenModal(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.templateTour}>
        {/* Заголовок и мета-информация */}
        <div className={styles.tourHeader}>
          <h1 className={styles.tourTitle}>{tourData.Title}</h1>
          <div className={styles.tourMeta}>
            <span className={styles.tourDuration}>
              🗓️{" "}
              {tourData.Duration
                ? `От ${tourData.Duration} дней`
                : "Длительность не указана"}
            </span>
            <span className={styles.tourPrice}>
              💰 от {tourData.Price || tourData.MinPrice} ₽
            </span>
            <span className={styles.tourCountry}>
              📍 {country?.Title || "Страна не указана"}
            </span>
          </div>
        </div>

        {/* Табы */}
        <div className={styles.content_wrapper}>
          <div className={styles.info_wrapper}>
            <div>
              <div className={styles.tourTabs}>
                <button
                  className={`${styles.tabBtn} ${activeTab === "description" ? styles.active : ""}`}
                  onClick={() => setActiveTab("description")}
                >
                  Описание
                </button>
                {hotels.length > 0 && (
                  <button
                    className={`${styles.tabBtn} ${activeTab === "hotels" ? styles.active : ""}`}
                    onClick={() => setActiveTab("hotels")}
                  >
                    Отели ({hotels.length})
                  </button>
                )}
              </div>

              {/* Контент табов */}
              <div className={styles.tabContent}>
                {activeTab === "description" && (
                  <>
                    <AnimateHeight height={isVisible ? "auto" : 300}>
                      <div className={styles.tourDescription}>
                        {tourData.Description?.split("\n").map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </AnimateHeight>

                    <button
                      className={styles.colapse_btn}
                      onClick={() => setVisible(!isVisible)}
                    >
                      {isVisible ? "Свернуть" : "Читать полностью"}
                    </button>
                  </>
                )}

                {activeTab === "hotels" && (
                  <div className={styles.tourHotels}>
                    {hotels.length === 0 ? (
                      <p>Информация об отелях скоро появится</p>
                    ) : (
                      <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        className={styles.swiper_hotels}
                      >
                        {hotels.map((hotel) => {
                          // ИСПРАВЛЕНО: Photo вместо Image
                          const hotelImg = hotel.Photo?.[0]?.url || null;
                          return (
                            <SwiperSlide className={styles.swiper_hotels_slide}>
                              <div className={styles.hotelCard} key={hotel.id}>
                                <img
                                  src={
                                    hotelImg
                                      ? `${BASE_URL}${hotelImg}`
                                      : "/images/hotel-placeholder.jpg"
                                  }
                                  alt={hotel.Title}
                                />
                                <div className={styles.hotelInfo}>
                                  <h4>{hotel.Title}</h4>
                                  <p>
                                    {hotel.Description?.substring(0, 120)}...
                                  </p>
                                  <span className={styles.hotelPrice}>
                                    {hotel.Price} ₽/ночь
                                  </span>
                                </div>
                              </div>
                            </SwiperSlide>
                          );
                        })}
                      </Swiper>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Кнопка заявки */}
            <button
              onClick={() => setOpenModal(!isOpenModal)}
              className={styles.tourBookingBtn}
            >
              Оставить заявку
            </button>
          </div>

          {/* Галерея (после всего) */}
          <div className={styles.tourGallery}>
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={images.length > 1}
              className={styles.tourSwiper}
            >
              {images.length > 0 ? (
                images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={`${BASE_URL}${img.url}`}
                      alt={tourData.Title}
                      className={styles.tourSlideImage}
                    />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <img
                    src="/images/placeholder.jpg"
                    alt="Нет фото"
                    className={styles.tourSlideImage}
                  />
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateTour;
