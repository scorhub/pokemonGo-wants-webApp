import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAdminPrints = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/dataseeds`}>Pokémon</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/areandataseeds`}>Arean</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/costumedataseeds`}>Costume</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/wantseeds`}>Want</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/arwantseeds`}>AllWant</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/areanwantseeds`}>AreanWant</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/costumewantseeds`}>CostumeWant</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/featuresseeds`}>Features</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/eventseeds`}>Events</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/eventmonsseeds`}>EventPokémons</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/newsseeds`}>News</NavLink>}
        </>
    );
};

export default NavAdminPrints;