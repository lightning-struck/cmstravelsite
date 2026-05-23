import React, { useEffect, useState } from "react";
import "./Pages.css";
import { useLocation } from "react-router-dom";
import { clientRoutes } from "../routes/client.routes";
import { renderBlocksToHTML } from "../utils/renderBlock";

const ServicesPage = () => {
  const nav = useLocation();
  const pathName = nav.pathname.replace("/", "");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = clientRoutes.getServices + pathName;
    console.log(`Запрос ${pathName}:`, url);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(`Ответ API ${pathName}:`, data);
        if (data.data && data.data.length > 0) {
          setData(data.data[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Ошибка загрузки ${pathName}:`, err);
        setError(true);
        setLoading(false);
      });
  }, [pathName]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="page-container">
        <div className="error">Страница не найдена</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">{data.textName}</h1>
      <div 
        className="page-content" 
        dangerouslySetInnerHTML={{ __html: renderBlocksToHTML(data.description) }} 
      />
    </div>
  );
};

export default ServicesPage;