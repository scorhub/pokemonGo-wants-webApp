import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAddData = ({ucid}) => {
    return (
        <>
        {(ucid === 1 || ucid === 2) && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/types`}>Types</NavLink>}
        {(ucid === 1 || ucid === 2) && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/generation`}>Generation</NavLink>}
        {(ucid === 1 || ucid === 2) && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/rarity`}>Rarity</NavLink>}
        {(ucid === 1 || ucid === 2) && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/released`}>Released</NavLink>}
        {(ucid === 1 || ucid === 2) && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/add/mega`}>Mega</NavLink>}
        </>
    );
};

export default NavAddData;