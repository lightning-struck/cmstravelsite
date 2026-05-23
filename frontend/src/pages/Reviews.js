import React, { useEffect, useState } from "react";
import { Reviews as Reviewscontent } from "../components/pages/Reviews/Reviews";
import { clientRoutes } from "../routes/client.routes";
export const Reviews = () => {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    fetch(clientRoutes.getReviews)
      .then((res) => res.json())
      .then((data) => {
        if (data.data && data.data.length > 0) {
          setReviews(data.data);
        }
      });
  }, []);

  return <Reviewscontent reviews={reviews} />;
};
