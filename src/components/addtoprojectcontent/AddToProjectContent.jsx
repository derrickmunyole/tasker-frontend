import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import { useTasksContext } from '../../contexts/TaskContext';
import styles from './AddToProjectContent.module.css';



function AddToProjectContent({ task, onClose }) {
  const { projects } = useProjects();
  const { assignToProject } = useTasksContext();
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdd = async (projectId) => {
    console.log(`Assigning task ${task.id} to project ${projectId}`);
    try {
      const response = await assignToProject(task.id, projectId);
      console.log(`ADDING TO PROJECT: ${JSON.stringify(response)}`)
      if (response?.success === true) {
        setSuccessMessage(`Task "${task.title}" added to project successfully!`);
      }
    } catch (error) {
      console.error(`Error adding to project: ${error}`);
    }



    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Assign to Project</h4>
      <div className={styles.projectList}>
        {projects.map(project => (
          <button
            key={project.id}
            className={styles.projectButton}
            onClick={() => handleAdd(project.id)}
          >
            {project.name}
          </button>
        ))}
      </div>
      {successMessage && (
        <div className={styles.successMessage}>
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default AddToProjectContent;
