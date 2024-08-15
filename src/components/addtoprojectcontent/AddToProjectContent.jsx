import React, { useState } from 'react';
import { useProjects } from '../../contexts/ProjectContext';
import styles from './AddToProjectContent.module.css';


  function AddToProjectContent({ task, onClose }) {
  const { projects } = useProjects();
  const [successMessage, setSuccessMessage] = useState('');

  const handleAdd = (projectId) => {
    // Implement the logic to assign the task to the selected project
    console.log(`Assigning task ${task.id} to project ${projectId}`);
    
    // Show success message
    setSuccessMessage(`Task "${task.title}" added to project successfully!`);
    
    // Close the modal after a delay
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
