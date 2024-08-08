import React from 'react';

const UpcomingTasks = ({ projects }) => {
  const getUpcomingTasks = () => {
    if (!Array.isArray(projects) || projects.length === 0) {
      return [];
    }

    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    return projects.flatMap(project =>
      (project.tasks || []).filter(task => {
        if (!task.deadline) return false;
        const taskDate = new Date(task.deadline);
        return taskDate >= today && taskDate <= nextWeek;
      })
    ).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  };

  const upcomingTasks = getUpcomingTasks();

  return (
    <div className="upcoming-tasks">
      <h4>Upcoming Tasks</h4>
      {upcomingTasks.length > 0 ? (
        <ul>
          {upcomingTasks.map(task => (
            <li key={task.id}>
              <span className="task-name">{task.name}</span>
              <span className="task-date">{new Date(task.deadline).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', height:'32rem'}}>
          <p>No upcoming tasks for the next week.</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;

