import React, { useState, useEffect } from "react";

import { skilldata } from "../skilldata"; 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function Skills() {
  const [skills, setSkills] = useState([]);

  // useEffect لجلب البيانات (محاكاة جلب API) عند تحميل المكون
  useEffect(() => {
    const fetchSkills = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(skilldata); // نرجع البيانات من ملف skilldata
        }, 500); // محاكاة تأخير بسيط لجلب البيانات
      });
    };

    fetchSkills().then(data => {
      // نجهز كل مهارة بإضافة حالة counter و intervalId لها
      const initialSkillsWithCounters = data.map(skill => ({
        ...skill,
        currentCounter: 0, // العداد الحالي
        intervalId: null, // لتخزين معرف المؤقت لكل مهارة
      }));
      setSkills(initialSkillsWithCounters);
    });

    // Cleanup: لإيقاف كل المؤقتات إذا تم إزالة المكون
    return () => {
      skills.forEach(skill => {
        if (skill.intervalId) {
          clearInterval(skill.intervalId);
        }
      });
    };
  }, []); // [] لضمان تشغيل هذا useEffect مرة واحدة فقط عند التركيب

  // useEffect لكل مهارة لبدء المؤقتات
  useEffect(() => {
    if (skills.length > 0) {
      const updatedSkills = skills.map(skill => {
        // إذا كان المؤقت لم يبدأ لهذه المهارة بعد وقيمتها لم تصل بعد
        if (skill.currentCounter < skill.value && skill.intervalId === null) {
          const interval = setInterval(() => {
            setSkills(prevSkills => {
              return prevSkills.map(s => {
                if (s.id === skill.id) {
                  const newCounter = s.currentCounter + 1;
                  if (newCounter >= s.value) {
                    clearInterval(s.intervalId); // إيقاف المؤقت عند الوصول للقيمة
                    return { ...s, currentCounter: s.value, intervalId: null };
                  }
                  return { ...s, currentCounter: newCounter };
                }
                return s;
              });
            });
          }, 50); // سرعة عداد الكاونتر

          return { ...skill, intervalId: interval }; // حفظ معرف المؤقت
        }
        return skill;
      });
      // نستخدم دالة تحديث الحالة لوضع قائمة المهارات الجديدة
      // ولكن يجب أن نكون حذرين لتجنب الحلقات اللانهائية هنا
      // هذا الجزء يجب أن يعمل فقط عند الحاجة لتحديث معرفات المؤقتات
      // إذا تم تشغيل هذا الـ useEffect مرات عديدة، قد يعيد بدء المؤقتات
      // الطريقة الحالية بـ `skill.intervalId === null` تحاول منع ذلك.
      // يفضل تحديث `skills` فقط إذا كان هناك تغيير فعلي في `intervalId` أو أي شيء آخر
      // setSkills(updatedSkills); // ممكن تتسبب في حلقة لا نهائية لو مفيش تغييرات حقيقية
    }
  }, [skills]); // هذا Effect سيعاد تشغيله عندما تتغير قائمة المهارات (مثلاً عند تحميلها لأول مرة)

  // إعدادات السلايدر (يمكنك تخصيصها)
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="skills-section"> {/* حاوية لقسم المهارات */}
    
      {skills.length > 3 ? (
        <Slider {...sliderSettings} className="skills-slider">
          {skills.map((skill) => (
            <div className="skill" key={skill.id}>
              {/* هنا الدائرة الخارجية كـ outer */}
              <div className="outer">
                {/* الدائرة الداخلية كـ inner وفيها الرقم */}
                <div className="inner">
                  <div>{skill.currentCounter}%</div>
                </div>
                {/* SVG للدائرة التقدمية */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="120px"
                  height="120px"
                  viewBox="0 0 120 120"
                >
                  <defs>
                    <linearGradient id={`GradientColor-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00bcd4" />
                      <stop offset="100%" stopColor="#ff9800" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={`url(#GradientColor-${skill.id})`}
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '314.159',
                      strokeDashoffset: 314.159 - (skill.currentCounter / 100) * 314.159
                    }}
                  />
                </svg>
              </div>
              <div className="skill-name">
                <span>{skill.name}</span> {/* اسم المهارة */}
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill" key={skill.id}>
              <div className="outer">
                <div className="inner">
                  <div>{skill.currentCounter}%</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="120px"
                  height="120px"
                  viewBox="0 0 120 120"
                >
                  <defs>
                    <linearGradient id={`GradientColor-${skill.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DA22FF" />
                      <stop offset="100%" stopColor="#9733EE" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={`url(#GradientColor-${skill.id})`}
                    strokeWidth="20"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '314.159',
                      strokeDashoffset: 314.159 - (skill.currentCounter / 100) * 314.159
                    }}
                  />
                </svg>
              </div>
              <div className="skill-name">
                <span>{skill.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;