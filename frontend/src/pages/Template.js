import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { clientRoutes } from "../routes/client.routes";
import TemplateTour from "../components/pages/TemplateTour/TemplateTour";
import styles from "../components/pages/TemplateTour/TemplateTour.module.css";

export default function Template() {
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { tour: tourSlug } = useParams();

  useEffect(() => {
    // ✅ Правильный синтаксис populate для Strapi v5
    const url = `${clientRoutes.getCurrentTour}${tourSlug}&populate=country&populate=Image&populate=hotels`;
    console.log("Запрос:", url);
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Ответ API:", data);
        if (data.data && data.data.length > 0) {
          setTour(data.data[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки тура:", err);
        setError(true);
        setLoading(false);
      });
  }, [tourSlug]);

  if (loading) return <div className={styles.tourLoading}>Загрузка тура...</div>;
  if (error || !tour) return <div className={styles.tourError}>Тур не найден</div>;

  return <TemplateTour tour={tour} />;
}