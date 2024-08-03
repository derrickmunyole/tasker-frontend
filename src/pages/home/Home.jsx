import React, { useEffect, useState } from 'react'
import './Home.css'
import { ReactSVG } from 'react-svg'
import { useAuth } from '../../contexts/AuthContext'
import { useUser } from '../../contexts/UserContext'


function Home() {
    const { user: authUser } = useAuth() // Get the current user from your auth context
    const { user, loading } = useUser() // Get user info from UserContext


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
            <div className='active-project-header'>
                <h2>Active projects</h2>
                <ReactSVG src="/src/assets/icons/keyboard_arrow_down.svg" />
            </div>
        </div>
    )
}

export default Home