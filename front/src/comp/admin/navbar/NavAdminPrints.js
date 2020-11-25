import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAdminPrints = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/printdataseeds`}>Pokémon seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/printwantseeds`}>Want seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/printarwantseeds`}>AllWant seeds</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/print/printareanwantseeds`}>AreanWant seeds</NavLink>}
        </>
    );
};

export default NavAdminPrints;