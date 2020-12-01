import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAdminPrints = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/dataseeds`}>Pokémon seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/areandataseeds`}>Arean seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/costumedataseeds`}>Costume seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/wantseeds`}>Want seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/arwantseeds`}>AllWant seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/areanwantseeds`}>AreanWant seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/costumewantseeds`}>CostumeWant seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/featuresseeds`}>Features seeds</NavLink>}
        </>
    );
};

export default NavAdminPrints;