import React from 'react';
import PropTypes from 'prop-types';
import { useRecurringTasks } from '../../hooks/useRecurringTasks';


const RecurringTaskComponent = ({ task, onCompleteTask }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>Due: {task.due_date}</p>
      {task.is_recurring && (
        <p>Recurrence: {task.recurrence_pattern}</p>
      )}
      <button onClick={() => onCompleteTask(task)}>Complete Task</button>
    </div>
  );
};

RecurringTaskComponent.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
    is_recurring: PropTypes.bool.isRequired,
    recurrence_pattern: PropTypes.oneOf(['daily', 'weekly', 'monthly']),
    // Add other task properties as needed
  }).isRequired,
  onCompleteTask: PropTypes.func.isRequired,
};

export default RecurringTaskComponent;
