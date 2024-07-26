import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import ContainerView from '../../components/containerview/ContanerView';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './MainPage.css';

/**
 * Renders the main page of the application.
 *
 * @return {JSX.Element} The JSX element representing the main page.
 */
function MainPage() {
  const [currentComponent, setCurrentComponent] = useState(); // set default component
  return (
    <>
    <Navbar />
    <div className='main-container'>
      <Sidebar className='sidebar'/>
      <main>
        <Outlet />
      </main>
    </div>
    </>
  );
}

export default MainPage;
