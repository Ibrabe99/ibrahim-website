import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function Skills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get("https://ibrahim.page.gd/api/skills");
        const data = response.data;

        const initialSkillsWithCounters = data.map(skill => ({
          ...skill,
          currentCounter: 0,
          intervalId: null,
        }));

        setSkills(initialSkillsWithCounters);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    return () => {
      skills.forEach(skill => {
        if (skill.intervalId) clearInterval(skill.intervalId);
      });
    };
  }, []);

  useEffect(() => {
    if (skills.length > 0) {
      skills.forEach(skill => {
        if (skill.currentCounter < skill.level && skill.intervalId === null) {
          const interval = setInterval(() => {
            setSkills(prevSkills =>
              prevSkills.map(s => {
                if (s.id === skill.id) {
                  const newCounter = s.currentCounter + 1;
                  if (newCounter >= s.level) {
                    clearInterval(s.intervalId);
                    return { ...s, currentCounter: s.level, intervalId: null };
                  }
                  return { ...s, currentCounter: newCounter };
                }
                return s;
              })
            );
          }, 50);

          setSkills(prev =>
            prev.map(s => (s.id === skill.id ? { ...s, intervalId: interval } : s))
          );
        }
      });
    }
  }, [skills]);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="skills-section">
      {skills.length > 3 ? (
        <Slider {...sliderSettings} className="skills-slider">
          {skills.map(skill => (
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
                <span>{skill.name}</span>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="skills-grid">
          {skills.map(skill => (
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
