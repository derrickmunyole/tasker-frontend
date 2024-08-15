import React, { useState, useEffect } from 'react';
import './CalendarWidget.css';
import { ReactSVG } from 'react-svg'

const CalendarWidget = ({ projects }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);


  const positionPopup = (dateElement) => {
    const rect = dateElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
    setPopupPosition({
      top: rect.bottom + scrollTop,
      left: rect.left + scrollLeft,
    });
  };
  
  

  const handleDateClick = (day, event) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    positionPopup(event.currentTarget);
  };

  const getTasksForDate = (date) => {
    if (!Array.isArray(projects)) {
      return [];
    }
    return projects.filter(project =>
      project.tasks && Array.isArray(project.tasks) && project.tasks.some(task =>
        task.deadline && new Date(task.deadline).toDateString() === date.toDateString()
      )
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectedDate && !event.target.closest('.task-popup') && !event.target.closest('.calendar-day')) {
        setSelectedDate(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedDate]);

  const beforeInjection = (svg) => {
    svg.classList.add('close');
    svg.setAttribute('style', 'color: #000');
}

  return (
    <div className="calendar-widget">
      <h4>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h4>
      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {Array(firstDayOfMonth).fill(null).map((_, index) => (
          <div key={`empty-${index}`} className="calendar-day empty"></div>
        ))}
        {days.map(day => (
          <div
            key={day}
            className={`calendar-day ${day === currentDate.getDate() ? 'current' : ''}`}
            onClick={(event) => handleDateClick(day, event)}
          >
            {day}
            {getTasksForDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day)).length > 0 && (
              <div className="task-indicator"></div>
            )}
          </div>
        ))}
      </div>
      {selectedDate && (
        <div className="task-popup" style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}>
          <div className='task-popup-header'>
            <h5>{selectedDate.toDateString()}</h5>
            <ReactSVG src="/src/assets/icons/close.svg" beforeInjection={beforeInjection}/>
          </div>
          {getTasksForDate(selectedDate).length > 0 ? (
            getTasksForDate(selectedDate).map(project => (
              <div key={project.id}>
                <h4>{project.name}</h4>
                <ul>
                  {project.tasks
                    .filter(task => task.deadline && new Date(task.deadline).toDateString() === selectedDate.toDateString())
                    .map(task => (
                      <li key={task.id}>{task.name}</li>
                    ))
                  }
                </ul>
              </div>
            ))
          ) : (
            <p>No tasks scheduled for this date.</p>
          )}
          <button onClick={() => setSelectedDate(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;
