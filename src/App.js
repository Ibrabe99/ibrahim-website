// App.js
import React, { useEffect, useState } from "react"; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from 'axios'; 

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



function TrackVisits() {
  const location = useLocation();

  useEffect(() => {
    const trackVisit = async () => {
      try {
        const res = await fetch("https://ibrahim.page.gd/api/track-visit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ page: location.pathname }),
        });

        const data = await res.json();
        console.log("✅ تم تسجيل زيارة:", location.pathname, data);
      } catch (err) {
        console.error("❌ خطأ في تسجيل الزيارة:", err);
      }
    };

    trackVisit();
  }, [location]);

  return null;
}

function App() {
 
  const [siteTitle, setSiteTitle] = useState('Ibrahim'); 
  const [siteFavicon, setSiteFavicon] = useState('/public/image/ابراهيم.jpg'); // لوجو افتراضي

  useEffect(() => {
    
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get("https://ibrahim.page.gd/api/admin");
        const adminData = response.data.data; 

        if (adminData) {
         
          if (adminData.name) {
            setSiteTitle(adminData.name);
          }
        
          if (adminData.photo) {
      
            setSiteFavicon(`https://ibrahim.page.gd/public/${adminData.photo}`);
          }
        }
      } catch (error) {
        console.error("خطأ في جلب بيانات الأدمن للتايتل واللوجو:", error);
       
      }
    };

    fetchAdminInfo();
  }, []); 

  return (
    <Router>
 
      <Helmet>
        <title>{siteTitle}</title>
        <link rel="icon" href={siteFavicon} />
      
        <link rel="apple-touch-icon" href={siteFavicon} />
      </Helmet>

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