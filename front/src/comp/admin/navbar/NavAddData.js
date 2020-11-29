import React from 'react';
import { NavLink } from 'react-router-dom';

const NavAddData = ({ucid}) => {
    return (
        <>
        {(ucid === 1 || 2) && <NavLink className="left1em" exact to={`/admin/add/types`}>Types</NavLink>}
        {(ucid === 1 || 2) && <NavLink className="left1em" exact to={`/admin/add/generation`}>Generation</NavLink>}
        {(ucid === 1 || 2) && <NavLink className="left1em" exact to={`/admin/add/rarity`}>Rarity</NavLink>}
        {(ucid === 1 || 2) && <NavLink className="left1em" exact to={`/admin/add/released`}>Released</NavLink>}
        </>
    );
};

export default NavAddData;