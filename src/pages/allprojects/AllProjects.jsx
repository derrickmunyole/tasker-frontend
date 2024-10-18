import React, { useState, useEffect } from 'react'
import { useProjects } from '../../contexts/ProjectContext'
import ProjectCard from '../../components/projectcard/ProjectCard'
import { Typography } from '@mui/material'

function AllProjects() {
  const { fetchProjects, projects } = useProjects()
  const [loading, setLoading] = useState(true)

  const loadProjects = async () => {
    try {
      setLoading(true)
      await fetchProjects()
      console.log('Projects:', projects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    loadProjects()
  }, [fetchProjects])
  return (
    <>
      <Typography variant="h1" gutterBottom>All Projects</Typography>
      <div style={projectsStyle}>
          {projects.map(project =>  (
            <ProjectCard key={project.id}  project={project}/>
            ))}
      </div>
    </>
  )
}

const projectsStyle = {
 display: 'Grid',
 gridTemplateColumns: 'repeat(auto-fill minmax(300px 1fr))',
 gap: '20px',
 padding: '20px'
}

export default AllProjects