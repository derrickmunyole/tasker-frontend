import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { TextField, Modal, Box, Typography, Button } from "@mui/material";
import './TaskItem.css'
import AddToProjectIcon from "../../assets/icons/AddToProject";
import AddEvent from "../../assets/icons/AddEvent";
import PersonAdd from "../../assets/icons/PersonAdd";
import AddReminder from "../../assets/icons/AddReminder";
import AddRepeat from "../../assets/icons/AddRepeat";
import EditTask from "../../assets/icons/EditTask";


function TaskItem({ task, onActionClick, onDatePickerOpen, onTaskUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(task.description || "");

  const toggleExpand = () => setExpanded(!expanded);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleTitleDoubleClick = (e) => {
    e.stopPropagation(); 
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    if (editedTitle !== task.title) {
      onTaskUpdate(task.id, { title: editedTitle });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    onTaskUpdate(task.id, { title: editedTitle, description: editedDescription });
    handleCloseModal();
  };

  return (
    <div className={`task-item ${expanded ? 'expanded' : ''}`}>
      <div className='task-overview' onClick={toggleExpand}>
        <input type="checkbox" />
        <div className="task-title-container">
          <span
            className={`task-title ${isEditing ? 'editing' : ''}`}
            onDoubleClick={handleTitleDoubleClick}
            style={{ display: isEditing ? 'none' : 'inline-block' }}
            title={task.title}
          >
            {task.title}
          </span>
          <TextField
            className={`task-title-input ${isEditing ? 'editing' : ''}`}
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            autoFocus
            size="small"
            fullWidth
            onClick={(e) => e.stopPropagation()}
            style={{ display: isEditing ? 'inline-block' : 'none' }}
          />
        </div>
      </div>
      {expanded && (
        <div className="task-actions">
        <div className="task-actions">
          <ReactSVG src="/src/assets/icons/create_new_folder.svg" onClick={() => onActionClick('addToProject', task)} />
          <ReactSVG src="/src/assets/icons/person_add.svg" onClick={() => onActionClick('assign', task)} />
          <ReactSVG
            src="/src/assets/icons/notifications.svg"
            onClick={(e) => onDatePickerOpen(e, 'reminder', task.id)}
          />
          <ReactSVG src="/src/assets/icons/repeat.svg" onClick={() => onActionClick('setRecurring', task)} />
          <ReactSVG src="/src/assets/icons/edit.svg" onClick={handleOpenModal} />
          <ReactSVG
            src="/src/assets/icons/event.svg"
            onClick={(e) => onDatePickerOpen(e, 'dueDate', task.id)}
          />
        </div>
      </div>
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="edit-task-modal"
        aria-describedby="modal-to-edit-task-details"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="edit-task-modal" variant="h6" component="h2">
            Edit Task
          </Typography>
          <TextField
            label="Title"
            value={editedTitle}
            onChange={handleTitleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button onClick={handleSaveChanges} variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default TaskItem;
