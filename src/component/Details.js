import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { FaEye } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Details() {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "/image/new.svg";
    if (imgPath.startsWith("http")) return imgPath;
    if (imgPath.startsWith("storage/")) {
      return `http://www.ibrahim.page.gd/public/${imgPath}`;
    }
    if (imgPath.startsWith("public/")) {
      return `http://www.ibrahim.page.gd/public/${imgPath.slice(7)}`;
    }
    return `http://www.ibrahim.page.gd/public/${imgPath}`;
  };

  // تسجيل زيارة عند دخول الصفحة
  useEffect(() => {
    if (!type || !id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // جلب البيانات
        const res = await fetch(`http://www.ibrahim.page.gd/api/${type}/${id}`);
        if (!res.ok) throw new Error("فشل جلب البيانات");
        const json = await res.json();
        setData(json.data || json);

        // تسجيل الزيارة فقط إذا لم يتم تسجيلها مسبقاً في التخزين المحلي (localStorage)
        const visitKey = `${type}-${id}-visited`;
        if (!localStorage.getItem(visitKey)) {
          await fetch(`http://www.ibrahim.page.gd/api/${type}/${id}/stats`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "view" }),
          });
          localStorage.setItem(visitKey, "true");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  const handleLike = async () => {
    if (liked) return; // لا تسمح بالإعجاب مرتين

    try {
      const res = await fetch(`http://www.ibrahim.page.gd/api/${type}/${id}/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like" }),
      });
      if (!res.ok) throw new Error("فشل تحديث الإعجاب");

      setLiked(true);
      // تحديث عدد اللايكات محلياً
      setData((prev) => ({
        ...prev,
        likes: (prev.likes || 0) + 1,
      }));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p>جارٍ تحميل البيانات...</p>;
  if (error) return <p>حدث خطأ: {error}</p>;
  if (!data) return <p>لا توجد بيانات للعرض</p>;

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: true,
  };

  const allImages = [];
  if (data.image) allImages.push(getImageUrl(data.image));

  if (data.images && data.images.length > 0) {
    const filteredImages = data.images.filter(
      (img) =>
        getImageUrl(img.url || img.path || img.image_url) !== getImageUrl(data.image)
    );
    filteredImages.forEach((img) =>
      allImages.push(getImageUrl(img.url || img.path || img.image_url))
    );
  }


  return (
    <section id="details">
        <div className="container" >
      <h2 className="title">{data.title || data.name}</h2>
      <h4 className="category_name">
        {data.category_name || (data.category && data.category.name)}
      </h4>

      {allImages.length > 0 ? (
        <Slider {...sliderSettings}>
          {allImages.map((imgSrc, idx) => (
            <div key={idx}>
<img
  className="img_details"
  src={imgSrc}
  alt={data.title || "صورة"}
  style={{
    width: "100%",           // أو استخدم عرض ثابت مثل "500px"
    height: "600px",         // ثابت لجميع الصور
    objectFit: "cover",
    marginTop: 15,
    borderRadius: "15px",
    border: "2px solid #b8b1b1",
  }}
/>

            </div>
          ))}
        </Slider>
      ) : (
        <p>لا توجد صور للعرض</p>
      )}

      <p className="description" style={{ marginTop: 30 }}>
        {data.description || data.content}
      </p>

      <div style={{ marginTop: 20, display: "flex", gap: 15 }}>
        {data.github_link && (
          <a
            href={data.github_link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-github"
          >
            Github
          </a>
        )}

        {data.live_link && (
          <a
            href={data.live_link}
            target="_blank"
            rel="noreferrer"
            className="btn btn-live"
          >
            Live Demo
          </a>
        )}
      </div>

      <div
        className="details_footer"
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          borderTop: "1px solid #ccc",
          paddingTop: 10,
         
        }}
      >
        <p>التاريخ: {data.date || data.created_at || "غير محدد"}</p>
        <p>الهجري: {data.hijri_date || "غير متوفر"}</p>

        <p>
          المشاهدات: <FaEye /> {data.views || 0}
        </p>

        <p
          onClick={handleLike}
          className={`like-button ${liked ? "liked" : ""}`}
          style={{
            cursor: liked ? "default" : "pointer",
            color: liked ? "white" : "#888",
            userSelect: "none",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
          title={liked ? "لقد أعجبت بهذا" : "اضغط للإعجاب"}
        >
          الإعجابات: <AiFillLike /> {data.likes || 0}
        </p>

        <p>اليوم: {data.day || "غير محدد"}</p>
      </div>

      </div>
    </section>
  );
}
