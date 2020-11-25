import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const user = JSON.parse(window.localStorage.getItem('loggedWantAppUser'));
    return (
        <header>
            <h2>PokéWants <i>BETA</i></h2>
            {(user !== null) && <NavLink exact to="/personal" activeClassName="notactive" className='dropmenu'>{user.name}</NavLink>}
        </header>
    );
};

export default Header;