import React, { useEffect, useState } from 'react'
import './Home.css'
import { ReactSVG } from 'react-svg'
import { useAuth } from '../../contexts/AuthContext'
import { useUser } from '../../contexts/UserContext'
import ProjectCard from '../../components/projectcard/ProjectCard'
import { ProjectProvider, useProjects } from '../../contexts/ProjectContext'
import CalendarWidget from '../../components/calendarwidget/CalendarWidget'
import UpcomingTasks from '../../components/upcomingtasks/UpcomingTasks'
import Divider from '../../components/divider/Divider';

function Home() {
    const { user: authUser } = useAuth()
    const { user, loading } = useUser()
    const { projects, fetchProjects } = useProjects();

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);


    if (loading) {
        return <div>Loading...</div>
    }


    const beforeInjection = (svg) => {
        svg.classList.add('more-vert');
        svg.setAttribute('style', 'color: #fff');
    }
    return (
            <div className='home-container'>
                <div className="overview">
                    <div className="at-a-glance">
                        <div className="top">
                            <p>Good evening, {user ? user.first_name : 'User'}</p>
                            <ReactSVG src="/src/assets/icons/more_vert.svg" />
                        </div>
                        <p className='h1'>At a glance</p>
                        <div className="quick-stats">
                            <div className="stat-item">
                                <p>Total Projects</p>
                            </div>
                            <div className="stat-item">
                                <p>Projects Completed</p>
                            </div>
                            <div className="stat-item">
                                <p>Tasks due today</p>
                            </div>
                            <div className="stat-item">
                                <p>Overdue tasks</p>
                            </div>
                        </div>
                    </div>
                    <div className="activity-feed">
                        <div className="activity-top">
                            <p>Activity Feed</p>
                            <ReactSVG src="/src/assets/icons/more_vert.svg" />
                        </div>
                        <div className="feed">

                        </div>
                    </div>
                </div>
                <div className='active-project-header-container'>
                    <div className='active-project-header' >
                        <h4>Active projects</h4>
                        <ReactSVG src="/src/assets/icons/keyboard_arrow_down.svg" />
                    </div>
                    <p>See more</p>
                </div>
                <div id="active-project-cards-container">
                    {projects.map(project => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                </div>
                <div id="calendarview-outer-container">
                    <div className="calendar-wrapper">
                        <div id="calendar-widget-container">
                            <CalendarWidget projects={projects} />
                        </div>
                    </div>
                    <Divider orientation="vertical" color="#FFF6F6" thickness={2} />
                    <div className="tasks-container">
                        <UpcomingTasks projects={projects} />
                    </div>

                </div>
            </div>
    )
}

function HomeWithProvider() {
    return (
        <ProjectProvider>
            <Home />
        </ProjectProvider>
    )
}

export default HomeWithProvider;