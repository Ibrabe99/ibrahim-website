import React, { useEffect, useState } from 'react';
import axios from 'axios';


const About_me = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axios.get("http://localhost:8080/website_dashboard/api/admin");

        // اطبع الاستجابة كاملة علشان نعرف مكان الداتا الصحيح
        console.log("الرد الكامل من API:", response.data);

        // جرب تسحب البيانات بالطريقة المباشرة مؤقتاً
        setAdminData(response.data); // لا تستخدم .data ثاني مرة إلا لو كنت متأكد
      } catch (err) {
        console.error("خطأ في جلب بيانات الأدمن:", err);
        setAdminData(null);
      }
    };

    fetchAdminProfile();
  }, []);
  return (
    <section id='about-me-section'> 
      <div className='container'>


        <div className='about_me-content'>
          <h1>
            نبذة عني
          </h1>


          <p>
          
                  {
              adminData?.description 
              ? adminData.description 
              : 'جاري تحميل المعلومات...'
            }

          </p>
        </div>
      </div>
    </section>
  )
}

export default About_me;