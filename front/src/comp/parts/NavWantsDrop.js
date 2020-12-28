import React from 'react';
import { NavLink } from 'react-router-dom';

const NavWantsDrop = () => {
    return (
        <>
        <NavLink className="mobleft1em" exact to={`/luckys`}>Lucky</NavLink>
        <NavLink className="mobleft1em" exact to={`/always`}>Always</NavLink>
        <NavLink className="mobleft1em" exact to={`/arean`}>Arean</NavLink>
        <NavLink className="mobleft1em" exact to={`/variant`}>Variant</NavLink>
        <NavLink className="mobleft1em" exact to={`/costume`}>Costume</NavLink>
        <NavLink className="mobleft1em" exact to={`/shiny`}>Shiny</NavLink>
        </>
    );
};

export default NavWantsDrop;