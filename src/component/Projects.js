import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SectionHeader from "./SectionHeader";
import Card from "./Card";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://www.ibrahim.page.gd/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <div className="projects-header">
          <SectionHeader title="المشاريع" />
          <div className="projects-container">
            <Card item={projects} type="project" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
