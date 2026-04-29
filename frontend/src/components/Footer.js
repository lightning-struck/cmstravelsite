import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Контактная информация</h4>
            <ul>
              <li>
                <span>📍 Адрес:</span> г. Владивосток, ул. Зои Космодемьянской,
                13
              </li>
              <li>
                <span>📞 Телефон:</span>{" "}
                <a href="tel:+79950740224">+7 (995) 074-02-24</a>
              </li>
              <li>
                <span>✉️ Email:</span>{" "}
                <a href="mailto:info@mir-puteshestviy.ru">
                  info@mir-puteshestviy.ru
                </a>
              </li>
              <li>
                <span>🕒 Режим работы:</span> Пн-Пт: 10:00 - 18:00
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Информация для туристов</h4>
            <ul>
              <li>
                <a href="/faq">❓ Вопросы и ответы</a>
              </li>
              <li>
                <a href="/privacy">🔒 Политика конфиденциальности</a>
              </li>
              <li>
                <a href="/offer">📄 Договор оферты</a>
              </li>
              <li>
                <a href="/insurance">🛡️ Страховка туристов</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Полезные ссылки</h4>
            <ul>
              <li>
                <a href="#">✈️ Туры</a>
              </li>
              <li>
                <a href="#">🌍 Страны</a>
              </li>
              <li>
                <a href="#">📸 Галерея</a>
              </li>
              <li>
                <a href="#">⭐ Отзывы</a>
              </li>
              <li>
                <a href="#">📞 Контакты</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Мы в соцсетях</h4>
            <ul className="social-icons">
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  📘
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  📸
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  🎵
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  💬
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 ООО «Мир Путешествий». Все права защищены.
          </div>
          <div className="footer-developer">
            Разработка: <a href="#">Екатерина Кузнецова</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
