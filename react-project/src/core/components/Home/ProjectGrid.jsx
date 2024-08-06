// src/ProjectGrid.js
import React from 'react';
import MyWorkCard from './Work';

const ProjectGrid = ({ projects }) => {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <MyWorkCard
          key={index}
          title={project.title}
          description={project.description}
          imageUrl={project.imageUrl}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;