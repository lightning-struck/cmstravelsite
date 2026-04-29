import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { BASE_URL } from "../../../routes/client.routes";
import styles from "./TemplateTour.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const TemplateTour = ({ tour }) => {
  const [activeTab, setActiveTab] = useState("description");

  // Нормализуем данные из Strapi
  const tourData = tour.attributes || tour;
  const images = tourData.Image?.data || tourData.Image || [];
  const hotels = tourData.hotels?.map(item => item.attributes || item) || [];
  const country = tourData.country?.data?.attributes || tourData.country?.attributes || tourData.country;

  return (
    <div className={styles.templateTour}>
      {/* Заголовок и мета-информация */}
      <div className={styles.tourHeader}>
        <h1 className={styles.tourTitle}>{tourData.Title}</h1>
        <div className={styles.tourMeta}>
          <span className={styles.tourDuration}>
            🗓️ {tourData.Duration ? `От ${tourData.Duration} дней` : "Длительность не указана"}
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
      <div className={styles.tourTabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === "description" ? styles.active : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Описание
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === "hotels" ? styles.active : ""}`}
          onClick={() => setActiveTab("hotels")}
        >
          Отели ({hotels.length})
        </button>
      </div>

      {/* Контент табов */}
      <div className={styles.tabContent}>
        {activeTab === "description" && (
          <div className={styles.tourDescription}>
            {tourData.Description?.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}

        {activeTab === "hotels" && (
          <div className={styles.tourHotels}>
            {hotels.length === 0 ? (
              <p>Информация об отелях скоро появится</p>
            ) : (
              <div className={styles.hotelsGrid}>
                {hotels.map((hotel) => {
                  const hotelImg = hotel.Image?.data?.[0]?.url || 
                                  hotel.Image?.[0]?.url || 
                                  hotel.Image?.url ||
                                  null;
                  return (
                    <div className={styles.hotelCard} key={hotel.id}>
                      <img
                        src={hotelImg ? `${BASE_URL}${hotelImg}` : "/images/hotel-placeholder.jpg"}
                        alt={hotel.Title}
                      />
                      <div className={styles.hotelInfo}>
                        <h4>{hotel.Title}</h4>
                        <p>{hotel.Description?.substring(0, 120)}...</p>
                        <span className={styles.hotelPrice}>{hotel.Price} ₽/ночь</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Кнопка заявки */}
      <button className={styles.tourBookingBtn}>Оставить заявку</button>

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
              <img src="/images/placeholder.jpg" alt="Нет фото" className={styles.tourSlideImage} />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TemplateTour;