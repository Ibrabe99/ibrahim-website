import { useEffect, useState } from "react";
import TypewriterHero from "../component/TypewriterHero";
import Social from "./Social";
import Skills from "./Skills";

export default function Home() {
  const [cvUrl, setCvUrl] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/website_dashboard/api/cv")
      .then((res) => res.json())
      .then((data) => {
        setCvUrl(data.url); 
      })
      .catch((error) => {
        console.error("Failed to fetch CV URL:", error);
      });
  }, []);

  return (
    <section id="home">
      <div className="container">
        <div className="home-header">
          <TypewriterHero />
          <div className="btns">
            {cvUrl && (
              <a href={cvUrl} className="btn cv" download>
                Download CV
              </a>
            )}
            <a href="/contact_me" className="btn about-me">
              About me
            </a>
          </div>
        </div>
        <Skills />
      </div>
      <Social />
    </section>
  );
}
