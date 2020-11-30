import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAddPokemons = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/add/pokemon`}>Add Pokémon</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/add/arean`}>Add Arean</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/add/costume`}>Add Costume</NavLink>}
        </>
    );
};

export default NavAddPokemons;