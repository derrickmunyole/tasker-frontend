import React from 'react'
import './ManageProject.css'
import { ReactSVG } from 'react-svg'

function ManageProject() {

    const projects = [
        { id: 1, name: "Website Redesign", duration: "3 months", deadline: "2024-11-30", status: "In Progress" },
        { id: 2, name: "Mobile App Development", duration: "6 months", deadline: "2025-02-15", status: "Planning" },
        { id: 3, name: "Database Migration", duration: "2 months", deadline: "2024-10-31", status: "Completed" },
        { id: 4, name: "AI Integration", duration: "4 months", deadline: "2025-01-20", status: "Not Started" },
    ];

    const handleArchive = (projectId) => {
        // Handle project archiving
        console.log(`Archiving project with id: ${projectId}`);
    };

    const handleDelete = (projectId) => {
        // Handle project deletion
        console.log(`Deleting project with id: ${projectId}`);
    };

    return (
        <div className='manage-project-container'>
            <div className="page-header-row">
                <h3>Manage Project</h3>
                <div className='arrangement-display'>
                    <ReactSVG src="/src/assets/icons/list.svg" />
                    <ReactSVG src="/src/assets/icons/grid_view.svg" />
                </div>
            </div>
            <div className="section-header">
                <h4>Project</h4>
                <h4>Duration</h4>
                <h4>Deadline</h4>
                <h4>Status</h4>
            </div>
            {projects.map(project => (
                <div key={project.id} className="data-row">
                    <span>{project.name}</span>
                    <span>{project.duration}</span>
                    <span>{project.deadline}</span>
                    <span>{project.status}</span>
                    <span className="action-icons">
                        <ReactSVG
                            src="/src/assets/icons/archive.svg"
                            className="icon archive-icon"
                            onClick={() => handleArchive(project.id)}
                        />
                        <ReactSVG
                            src="/src/assets/icons/delete.svg"
                            className="icon delete-icon"
                            onClick={() => handleDelete(project.id)}
                        />
                    </span>
                </div>
            ))}
        </div>
    )
}

export default ManageProject