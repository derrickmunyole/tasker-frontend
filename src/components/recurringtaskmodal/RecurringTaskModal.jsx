import React, { useState } from 'react';
import TaskActionModal from '../taskactionmodal/TaskActionModal';
import RecurringTaskForm from '../recurringtaskform/RecurringTaskForm';

function RecurringTaskModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal}>Create Recurring Task</button>
      <TaskActionModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Create Recurring Task</h2>
        <RecurringTaskForm />
      </TaskActionModal>
    </>
  );
}

export default RecurringTaskModal;
