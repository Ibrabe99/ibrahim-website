import Slider from "react-slick";
import { FaEye } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const truncateText = (text, wordLimit) => {
  if (!text) return ""; // لو النص غير موجود، رجع نص فارغ
  const words = text.split(" ");
  if (words.length <= wordLimit) return text;
  return words.slice(0, wordLimit).join(" ") + " ...";
};

export default function CardSlider({ item }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  // دالة لتحديد النوع تلقائيًا حسب خصائص العنصر
  const getType = (obj) => {
    if ("github_link" in obj) return "projects";
    if ("content" in obj) return "articles";
    return "unknown"; // احتياطي
  };

  return (
    <div className="card-container">
      {item && item.length > 0 ? (
        <Slider {...settings}>
          {item.map((items) => (
            <div key={items.id} className="card">
              <div className="card-content">
                <div className="card-body">
                  <h2 className="card-title">{items.title}</h2>
                  <h4 className="card-subtitle">{items.category_name}</h4>
                  <p className="card-text">
                    {truncateText(items.description || items.content, 35)}
                  </p>
                  <Link to={`/details/${getType(items)}/${items.id}`}>
                    قراءة المزيد
                  </Link>
                </div>
<img
  src={
    items.image
      ? `http://localhost:8080/website_dashboard/public/${items.image}`
      : "/image/new.svg"
  }
  alt={items.title}
  className="w-full object-cover rounded-md"
/>

              </div>

              <div className="card-footer">
                <div className="card-buttons">
                  {items.live_link && (
                    <a
                      href={items.live_link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-live"
                    >
                      Live Demo
                    </a>
                  )}
                  {items.github_link && (
                    <a
                      href={items.github_link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-github"
                    >
                      Github
                    </a>
                  )}
                </div>
                <div className="card-details">
                  <p className="crad-date">{items.hijri_date || "غير متوفر"}</p>
                  <p> {items.date || items.created_at || "غير محدد"}</p>
                  <p className="crad-day">{items.day || "يوم غير محدد"}</p>
                  <p className="crad-views">
                    <FaEye /> {items.views || 0}
                  </p>
                  <p className="crad-likes">
                    <AiFillLike /> {items.likes || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p>جارٍ تحميل المحتوى أو لا يوجد محتوى</p>
      )}
    </div>
  );
}
