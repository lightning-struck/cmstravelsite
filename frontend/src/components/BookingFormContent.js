import React from 'react';

const BookingFormContent = ({ formData, tours, status, handleChange, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>ФИО</label>
                    <input
                        type="text"
                        name="Name"
                        placeholder="Иванов Иван Иванович"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="Email"
                        placeholder="ivan@gmail.com"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Телефон</label>
                    <input
                        type="tel"
                        name="PhoneNumber"
                        placeholder="+7 999 999-99-99"
                        value={formData.PhoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Выбранный тур</label>
                    <select
                        name="tours"
                        value={formData.tours}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Выберите тур</option>
                        {tours && tours.map(tour => (
                            <option key={tour.id} value={tour.id}>
                                {tour.Title} — {tour.country?.Title} ({tour.DurationDays || tour.Duration} дней) — {tour.Price || tour.Stoimost_rub} ₽
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
            </button>

            {status === 'success' && (
                <div className="success-message">
                    ✅ Заявка успешно отправлена! Менеджер свяжется с вами.
                </div>
            )}
            {status === 'error' && (
                <div className="error-message">
                    ❌ Ошибка отправки. Попробуйте позже.
                </div>
            )}
        </form>
    );
};

export default BookingFormContent;