// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import Sections from "./components/Sections";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";
import GalleryPage from "./components/GalleryPage";
import BookingForm from "./components/BookingForm";
import FAQ from "./pages/FAQ";
import Privacy from "./pages/Privacy";
import Offer from "./pages/Offer";
import Insurance from "./pages/Insurance";
import "./App.css";
import "./components/AOS.css";
import "swiper/css";
import MainSection from "./components/MainSection";
import { clientRoutes } from "./routes/client.routes";
import Template from "./pages/Template";
import { Reviews } from "./pages/Reviews";
import ServicesPage from "./pages/Services";

function App() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(clientRoutes.getTours)
      .then((res) => res.json())
      .then((data) => {
        setTours(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки туров:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <MainSection />
                <div className="main_content">
                  <Slider />
                  <Sections />
                  {!loading && <BookingForm tours={tours} />}
                  <ContactSection />
                </div>
              </>
            }
          />
          <Route path="/gallery" element={<GalleryPage />} />
          {/* Новые страницы */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/oferta" element={<Offer />} />
          <Route path="/insure" element={<Insurance />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/ekskursii" element={<ServicesPage />} />
          <Route path="/transfer" element={<ServicesPage />} />
          <Route path="/tours">
            <Route path=":tour" element={<Template />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
