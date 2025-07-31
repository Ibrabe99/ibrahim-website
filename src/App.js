import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/header";
import Home from "./component/Home";
import Projects from "./component/Projects";
import Articles from "./component/Articles";
import About_me from "./component/About_me";
import Contact_me from "./component/Contact_me";
import Details from "./component/Details";
import Social from "./component/Social";
import Social_2 from "./component/Social_2";
import './index.css';
import './js.js';

function TrackVisits() {
  const location = useLocation();

  useEffect(() => {
    // إرسال طلب تسجيل الزيارة عند تغير المسار (أي زيارة صفحة جديدة)
    fetch("http://localhost:8080/website_dashboard/api/track-visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: location.pathname }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("تم تسجيل زيارة الصفحة:", location.pathname);
      })
      .catch((err) => {
        console.error("خطأ في تسجيل الزيارة:", err);
      });
  }, [location]);

  return null; // هذا مكون وظيفته فقط تتبع الزيارات ولا يعرض شيء
}

function App() {
  return (
    <Router>
      <Header />
      <TrackVisits />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about_me" element={<About_me />} />
        <Route path="/contact_me" element={<Contact_me />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
      <Social />
      <div className="social_2">
      <Social_2 />
      </div>
    </Router>
  );
}

export default App;
