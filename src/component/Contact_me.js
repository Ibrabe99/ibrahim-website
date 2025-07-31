import React, { useState } from "react";
import Social_2 from "./Social_2";

export default function Contact_me() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/website_dashboard/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("تم إرسال الرسالة بنجاح!");
        setFormData({ name: "", email: "", address: "", message: "" });
      } else {
        alert("حدث خطأ أثناء الإرسال.");
      }
    } catch (err) {
      console.error(err);
      alert("حدث خطأ في الاتصال بالخادم.");
    }
  };

  return (
    <section id="contact-me-section">
      <div className="container">
        <form onSubmit={handleSubmit} className="contact-form-content">
          <h1 className="contact-title">تواصل معي</h1>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address" className="form-label">العنوان</label>
              <input
                type="text"
                id="address"
                className="form-input"
                value={formData.address}
                onChange={handleChange}
                placeholder="ادخل العنوان"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name" className="form-label">الإسم</label>
              <input
                type="text"
                id="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="ادخل اسمك الكامل"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">البريد الإلكتروني</label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="ادخل بريدك الإلكتروني"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">الرسالة</label>
            <textarea
              id="message"
              className="form-textarea"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="اكتب رسالتك هنا"
            />
          </div>

          <button type="submit" className="submit-button">إرسال الرسالة</button>
        </form>


          
      </div>
    
    </section>
  );
}
