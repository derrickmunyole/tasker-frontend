import React, { useState } from 'react';
import './MilestoneTracker.css';

const MilestoneTracker = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const handleMilestoneClick = (milestone) => {
    setSelectedMilestone(selectedMilestone === milestone ? null : milestone);
  };

  const completedMilestones = milestones.filter(m => m.completed).length;
  const progress = (completedMilestones / milestones.length) * 100;

  return (
    <div className="milestone-tracker-compact">
      <h3>Milestones ({completedMilestones}/{milestones.length})</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="milestones-list">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`milestone ${milestone.completed ? 'completed' : ''} ${selectedMilestone === milestone ? 'selected' : ''}`}
            onClick={() => handleMilestoneClick(milestone)}
          >
            <div className="milestone-dot"></div>
            <div className="milestone-content">
              <div className="milestone-label">{milestone.label}</div>
              {selectedMilestone === milestone && (
                <div className="milestone-details">
                  {milestone.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneTracker;
