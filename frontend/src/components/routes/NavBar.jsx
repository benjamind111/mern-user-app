import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'

const NavBarPage = () => {
return (
    <div className='navbar'>
        <h1>LOGO</h1>
        <div className='sub-nav'>
            {/* <a href="">Home</a>
            <a href="">Service</a>
            <a href="">Contact</a>
            <a href="">About</a> */}
            <Link to='/home'>Home</Link>
            <Link to='/service'>Service</Link>
            <Link to='contact'>Contact</Link>
            <Link to='about'>About</Link>
        </div>
    </div>
)
}

export default NavBarPage;