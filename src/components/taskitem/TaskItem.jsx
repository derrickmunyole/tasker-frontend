import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import './TaskItem.css'

function TaskItem({ task, onActionClick }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className={`task-item ${expanded ? 'expanded' : ''}`}>
      <div className='task-overview' onClick={toggleExpand}>
        <input type="checkbox" />
        <span>{task.title}</span>
      </div>
      {expanded && (
        <div className="task-actions">
          <ReactSVG src="/src/assets/icons/create_new_folder.svg" onClick={() => onActionClick('addToProject', task)} />
          <ReactSVG src="/src/assets/icons/person_add.svg" onClick={() => onActionClick('assign', task)} />
          <ReactSVG src="/src/assets/icons/notifications.svg" onClick={() => onActionClick('setDeadline', task)} />
          <ReactSVG src="/src/assets/icons/repeat.svg" onClick={() => onActionClick('setRecurring', task)} />
          <ReactSVG src="/src/assets/icons/edit.svg" onClick={() => onActionClick('edit', task)} />
        </div>
      )}
    </div>
  );
}

export default TaskItem