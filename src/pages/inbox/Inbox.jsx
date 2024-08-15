import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Inbox.css';
import TaskItem from '../../components/taskitem/TaskItem';
import { useTasks } from '../../contexts/TaskContext';
import LoadingIndicator from '../../components/loadingcomponent/LoadingWidget';
import TaskActionModal from '../../components/taskactionmodal/TaskActionModal';
import { ProjectProvider, useProjects } from '../../contexts/ProjectContext'
import AddToProjectContent from '../../components/addtoprojectcontent/AddToProjectContent';


function Inbox() {
  const [newTask, setNewTask] = useState('');
  const { tasks, fetchTasks } = useTasks();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const { fetchProjects } = useProjects();

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      await fetchTasks();
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setIsLoading(false);
    }
  }, [fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleActionClick = useCallback((actionType, task) => {
    setActiveModal(actionType);
    setSelectedTask(task);
  }, []);


  const closeModal = useCallback(() => {
    setActiveModal(null);
    setSelectedTask(null);
  }, []);

  const renderModalContent = useMemo(() => {
    switch (activeModal) {
      case 'addToProject':
        fetchProjects();
        return <AddToProjectContent task={selectedTask} onClose={closeModal} />;
      case 'assign':
        return <h2>Assign Task</h2>;
      case 'setDeadline':
        return <h2>Set Deadline</h2>;
      case 'setRecurring':
        return <h2>Set Recurring</h2>;
      case 'edit':
        return <h2>Edit Task</h2>;
      default:
        return null;
    }
  }, [activeModal]);

  const taskList = useMemo(() => (
    <div className='task-list'>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onActionClick={handleActionClick} />
      ))}
    </div>
  ), [tasks, handleActionClick]);

  if (isLoading) {
    return (
      <div
        style={{
          width: 100,
          height: 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <LoadingIndicator />
      </div>
    );
  }
  if (error) return <div>{error}</div>;

  return (
    <div className='inbox-container'>
      <h3>Inbox</h3>
      <div className='add-task-container'>
        <input
          type='text'
          className='add-task-input'
          placeholder='Add a new task...'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
      </div>
      {taskList}
      <TaskActionModal isOpen={!!activeModal} onClose={closeModal}>
        {renderModalContent}
        {/* Add your form or content for the specific action */}
        {/* You can use the selectedTask state to access the task data */}
      </TaskActionModal>
    </div>
  );
}

export default React.memo(Inbox);
