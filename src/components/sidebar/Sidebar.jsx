import React from 'react';
import { Link } from 'react-router-dom';
import { useDisclosure, Button } from '@chakra-ui/react';
import './Sidebar.css';
import CreateProjectModal from '../createprojectmodal/CreateProjectModal';
import SidebarLink from '../sidebarlink/SideBarLink';


function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <nav className='sidebar'>
        <div className="top-section">
          <ul>
            <li><SidebarLink to="/">Home</SidebarLink></li>
            <li><SidebarLink to="/inbox">Inbox</SidebarLink></li>
            <li><SidebarLink to="/today">Today</SidebarLink></li>
            <li><SidebarLink to="/assigned">Assigned to me</SidebarLink></li>
          </ul>
        </div>
        <div className="divider"></div>
        <div className="bottom-section">
          <ul>
            <li><SidebarLink to="/projects">Projects</SidebarLink></li>
            <li>
              <SidebarLink onClick={onOpen}>
                Create Project
              </SidebarLink>
            </li>
            <li><SidebarLink to="/manage-projects">Manage Projects</SidebarLink></li>
          </ul>
        </div>
      </nav>
      <CreateProjectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Sidebar;
