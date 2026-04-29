import React, { useState } from 'react';
import './BookingForm.css';
import { clientRoutes } from '../routes/client.routes';
import BookingFormContent from './BookingFormContent';

function BookingForm({ tours }) {
    const [formData, setFormData] = useState({
        Name: '',
        Email: '',
        PhoneNumber: '',
        tours: ''
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const formatPhoneNumber = (phone) => {
        if (!phone) return '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 11 && cleaned.startsWith('8')) {
            return '7' + cleaned.slice(1);
        }
        if (cleaned.length === 11 && cleaned.startsWith('7')) {
            return cleaned;
        }
        return cleaned;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        if (!formData.tours) {
            setStatus('error');
            return;
        }

        const selectedTour = tours.find(t => t.id === parseInt(formData.tours));
        const formattedPhone = formatPhoneNumber(formData.PhoneNumber);

        const requestData = {
            data: {
                Name: formData.Name,
                Email: formData.Email,
                PhoneNumber: formattedPhone,
                tours: formData.tours,
                DurationDays: selectedTour?.DurationDays || selectedTour?.Duration || 0,
                Price: selectedTour?.Price || selectedTour?.Stoimost_rub || 0
            }
        };

        console.log('Отправляем:', JSON.stringify(requestData, null, 2));

        try {
            const response = await fetch(clientRoutes.sendOffer, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const responseData = await response.json();
            console.log('Ответ сервера:', responseData);

            if (response.ok) {
                setStatus('success');
                setFormData({ Name: '', Email: '', PhoneNumber: '', tours: '' });
                setTimeout(() => setStatus(null), 3000);
            } else {
                console.error('Детали ошибки:', responseData.error?.details);
                setStatus('error');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setStatus('error');
        }
    };

    return (
        <div className="booking-form" id="booking">
            <div className="booking-container">
                <h2>Оставить заявку</h2>
                <p>Заполните форму, и наш менеджер свяжется с вами для подбора тура</p>
                
                <BookingFormContent 
                    formData={formData}
                    tours={tours}
                    status={status}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    );
}

export default BookingForm;