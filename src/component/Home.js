import React, { useState, useEffect } from "react";
import TypewriterHero from "../component/TypewriterHero";
import Social from "./Social";
import Skills from "./Skills";


export default function Home() {

  return (
    <section id="home">
      <div className="container">
        <div className="home-header">
          <TypewriterHero />
          <div className="btns">
            <a href="/#" className="btn cv">Download CV</a>
            <a href="/#" className="btn about-me">About me</a>
          </div>

          
        </div>
<Skills />

      </div>
      <Social />
    </section>
  );
}
