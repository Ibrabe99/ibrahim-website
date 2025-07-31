import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionHeader from "./SectionHeader";
import Card from "./Card";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/website_dashboard/api/articles")
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <div className="projects-header">
          <SectionHeader title="المقالات" />

          <div className="projects-container">
            <Card item={articles} type="articles" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
