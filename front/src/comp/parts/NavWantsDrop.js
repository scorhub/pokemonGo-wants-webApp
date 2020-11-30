import React from 'react';
import { NavLink } from 'react-router-dom';

const NavWantsDrop = () => {
    return (
        <>
        <NavLink className="left1em" exact to={`/luckys`}>Lucky Wants</NavLink>
        <NavLink className="left1em" exact to={`/always`}>Always Wants</NavLink>
        <NavLink className="left1em" exact to={`/arean`}>Arean Wants</NavLink>
        <NavLink className="left1em" exact to={`/costumes`}>Costume Wants</NavLink>
        </>
    );
};

export default NavWantsDrop;