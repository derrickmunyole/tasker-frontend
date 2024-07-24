import React from 'react';
import NavigationBar from '../../components/navigation/NavigationBar';
import MainView from '../../components/mainview/MainView';
import './MainPage.css';

function MainPage() {
  return (
    <div className='home-container'>
      <NavigationBar />
      <MainView />
    </div>
  );
}

export default MainPage;
