import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProjects } from '../../contexts/ProjectContext'
import MilestoneTracker from '../../components/project/milestonesection/MilestoneTracker'
import './Project.css'

const Project = () => {
  const { projectId } = useParams()
  const { currentProject, fetchProjectById } = useProjects();

  const milestones = [
    { label: 'Start', description: 'Project kickoff', completed: true },
    { label: 'Planning', description: 'Define project scope and timeline', completed: true },
    { label: 'Design', description: 'Create wireframes and mockups', completed: false },
    { label: 'Development', description: 'Build the application', completed: false },
    { label: 'Testing', description: 'Perform QA and user testing', completed: false },
    { label: 'Launch', description: 'Deploy the application', completed: false },
  ];

  useEffect(() => {
    fetchProjectById(projectId);
  }, [projectId, fetchProjectById])

  if (!currentProject) {
    return <div>Loading...</div>
  }

  return (
    <div className="project-details-container">
      <h1>{currentProject.name}</h1>
      <p>{currentProject.description}</p>
      <div className="project-info">
        
      </div>
      <MilestoneTracker milestones={milestones} />/
    </div>
  )
}

export default Project
