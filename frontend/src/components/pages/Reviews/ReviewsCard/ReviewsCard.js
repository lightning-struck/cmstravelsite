import React from "react";
import s from "./ReviewsCard.module.css";
import { formatDate } from "../../../../utils/formatDate";

export const ReviewsCard = (props) => {
  const { image, name, tour, date, text } = props;

  return (
    <div className={s.card}>
      <div>
        <div className={s.card_header}>
          <div className={s.card_header_profile}>
            <div className={s.profile}>
              <div className={s.card_header_profile_wrapper_image}>
                <img
                  src={image}
                  alt={name}
                  className={s.card_header_profile_image}
                />
              </div>
              <div className={s.card_header_profile_name_wrapper}>
                <p className={s.card_header_profile_name}>{name}</p>
                <p className={s.card_header_profile_tour}>{tour.Title}</p>
                ⭐⭐⭐⭐⭐
              </div>
            </div>
            <div className={s.date}>{formatDate(date)}</div>
          </div>
        </div>
        <div className={s.text}>{text}</div>
      </div>
      <a href={`/tours/` + tour.slug} className={s.tour_btn}>Посмотреть тур</a>
    </div>
  );
};
