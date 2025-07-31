import React, { useState, useEffect } from "react";
import { IoMdMailUnread, IoMdMenu, IoMdClose } from "react-icons/io";
import axios from "axios";
import Social_2 from "./Social_2";

export default function Header() {
  const [adminPhoto, setAdminPhoto] = useState("");
  const [adminName, setAdminName] = useState("Ibrahim");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          "http://www.ibrahim.page.gd/api/admin"
          // "http://localhost:8080/website_dashboard/api/admin"
        );
        const data = response.data;

        if (data && data.photo) {
          setAdminPhoto(
            // `http://localhost:8080/website_dashboard/public/${data.photo}`
            `http://www.ibrahim.page.gd/public/${data.photo}`

          );
        }

        if (data && data.name) {
          setAdminName(data.name);
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header id="header">
      <nav className="navbar" dir="rtl">
        
        {adminPhoto && (

         
          <img
            src={adminPhoto}
            alt={adminName || "Admin Logo"}
            className="logo"
          />
        )}

        <ul className="main-menu">
          <li>
            <a href="/">الرئيسية</a>
          </li>
          <li>
            <a href="/projects">المشاريع</a>
          </li>
          <li>
            <a href="/articles">المقالات</a>
          </li>
          <li>
            <a href="/about_me">نبذة عني</a>
          </li>
        </ul>

        <div className="send_me">
          <a href="/contact_me" className="send_me_link">
            تواصل معي <IoMdMailUnread />
          </a>
        </div>

        <span className="ibra">Ibrahim</span>

        {/* زر القائمة الجانبية */}
        <span className="menu" onClick={toggleMenu}>
          {menuOpen ? <IoMdClose /> : <IoMdMenu />}
        </span>
      </nav>

      {/* القائمة الجانبية */}
      {menuOpen && (
        <div className="off-screen-menu">
      
          <span className="close-icon" onClick={toggleMenu}>
            <IoMdClose />
          </span>

          {/* روابط القائمة */}
          <ul className="off-screen-links">
            <li>
              <a href="/" onClick={toggleMenu}>
                الرئيسية
              </a>
            </li>
            <li>
              <a href="/projects" onClick={toggleMenu}>
                المشاريع
              </a>
            </li>
            <li>
              <a href="/articles" onClick={toggleMenu}>
                المقالات
              </a>
            </li>
            <li>
              <a href="/about_me" onClick={toggleMenu}>
                نبذة عني
              </a>
            </li>
                    <div className="send_me">
          <a href="/contact_me" className="send_me_link">
            تواصل معي <IoMdMailUnread />
          </a>
        </div>
          </ul>

         
          <Social_2 />
        </div>
      )}
    </header>
  );
}
