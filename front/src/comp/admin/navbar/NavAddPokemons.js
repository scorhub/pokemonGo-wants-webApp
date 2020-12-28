import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAddPokemons = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/pokemon`}>Add Pokémon</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/arean`}>Add Arean</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/variant`}>Add Variant</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/costume`}>Add Costume</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/shiny`}>Add Shiny</NavLink>}
        </>
    );
};

export default NavAddPokemons;