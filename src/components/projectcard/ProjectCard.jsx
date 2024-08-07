import React from 'react'
import './ProjectCard.css'

function ProjectCard({project}) {
  return (
    <div id='project-card-container'>
      <p id='project-title'>{project.name}</p>
      <p>Tasks completed</p>
      <p>Percent complete</p>
      <button id='project-details-btn'>Details</button>
    </div>
  )
}

export default ProjectCard;