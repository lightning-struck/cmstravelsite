import React, { useEffect } from 'react';
import './MovieModal.css';
import { BASE_URL } from '../routes/client.routes';

const MovieModal = ({ tour, onClose }) => {
    // Блокируем скролл страницы при открытии модалки
    useEffect(() => {
        // Сохраняем текущее значение overflow
        const originalStyle = window.getComputedStyle(document.body).overflow;
        // Блокируем скролл
        document.body.style.overflow = 'hidden';
        
        // Обработчик клавиши Escape
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        
        // Возвращаем всё как было при закрытии
        return () => {
            document.body.style.overflow = originalStyle;
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!tour) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleBackdropClick}>
            <div className="modal-content2">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-body">
                    {/* <img 
                        src={tour.Image?.[0] ? `${BASE_URL + tour.Image[0].url}` : '/images/slide3.webp'} 
                        alt={tour.Title} 
                        className="modal-poster" 
                    /> */}
                    <div className="modal-details">
                        <h2 className="modal-title">{tour.Title}</h2>
                        <p><strong>Страна:</strong> {tour.country?.Title || 'не указана'}</p>
                        <p><strong>Длительность:</strong> {tour.Duration || tour.DurationDays} дней</p>
                        <p><strong>Стоимость:</strong> {tour.Price || tour.Stoimost_rub} ₽</p>
                        <p><strong>Описание:</strong></p>
                        <p className="modal-description-text">{tour.Description || 'Описание отсутствует'}</p>
                        
                        <a 
                            href={`https://wa.me/79089672757?text=Здравствуйте! Хочу узнать подробнее о туре: ${encodeURIComponent(tour.Title)}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <button className="buy-ticket-button">Связаться с менеджером</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieModal;