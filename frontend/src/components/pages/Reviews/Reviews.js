import React from "react";
import s from "./Reviews.module.css";
import { Container } from "../../shared/container/container";
import { ReviewsCard } from "./ReviewsCard/ReviewsCard";
import { BASE_URL } from "../../../routes/client.routes";
export const Reviews = (props) => {
  const { reviews } = props;
  console.log(reviews);
  return (
    <Container>
      <h1 className={s.title}>Отзывы</h1>
      <div className={s.reviews}>
        {reviews?.map((item) => (
          <ReviewsCard
            tour={item.tour}
            date={item.createdAt}
            name={item.name}
            text={item.description[0].children[0].text}
            image={`${BASE_URL}` + item.profilePic[0].url}
          />
        ))}
      </div>
    </Container>
  );
};
