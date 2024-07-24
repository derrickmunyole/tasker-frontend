import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import './Navbar.css'
import { ReactSVG } from 'react-svg';

function Navbar() {

  const beforeInjection = (svg) => {
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 512 512');
  }

  return (
    <div className='navbar'>
      <h1>Tasker</h1>
      <ul className='navbar-ul'>
        <li>Tasks</li>
        <li>Projects</li>
        <li>Kanban</li>
      </ul>
      <InputGroup width="300px" className='search'>
        <InputLeftElement pointerEvents='none'>
          <ReactSVG src="/src/assets/icons/search.svg" />
        </InputLeftElement>
        <Input placeholder='Search' />
      </InputGroup>
      <div className="profile-container">
        <ReactSVG src="/src/assets/icons/bell.svg" className="bell" beforeInjection={beforeInjection} />
        <div className='initials'>

        </div>
      </div>
    </div>
  )
}

export default Navbar