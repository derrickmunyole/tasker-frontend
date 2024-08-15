import React, { useState, useEffect } from 'react'
import './Today.css'
import TaskItem from '../../components/taskitem/TaskItem'
import { useTasks } from '../../contexts/TaskContext'
import LoadingIndicator from '../../components/loadingcomponent/LoadingWidget'

function Inbox() {
  const [newTask, setNewTask] = useState('')
  const {tasks, fetchTasks} = useTasks()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoading(true)
        await fetchTasks()
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load tasks')
        setIsLoading(false)
      }
    }
    loadTasks()
  }, [])

  console.log(tasks)

  if (isLoading) {
    return <div style={
      { width: 100, 
        height: 100, 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)' 
      }}><LoadingIndicator /></div>;
  }
  if (error) return <div>{error}</div>


  return (
      <div className='inbox-container'>
        <h3>Today</h3>
        <div className='task-list'>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      </div>
  )
}

export default Inbox;