import React from "react";
import s from "./sections-card.module.css";
import { BASE_URL } from "../../routes/client.routes";

export const SectionsCard = ({tour}) => {
  return (
    <div className={s.section}>
      <div className={s.card} key={tour.id}>
        <img
          src={
            tour.Image?.[0]
              ? `${BASE_URL + tour.Image[0].url}`
              : "/images/slide3.webp"
          }
          alt={tour.Title}
          className={s.card_image}
        />
        <h3 className={s.card_title}>{tour.Title}</h3>
        <p className={s.card_price}>{tour.Duration} дней</p>
        <p className={s.card_description}>
          {tour.Description
            ? tour.Description.substring(0, 100) + "..."
            : "Нет описания"}
        </p>
        <button className={s.card_button}>Подробнее</button>
      </div>
    </div>
  );
};
