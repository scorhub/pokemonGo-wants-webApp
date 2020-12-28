import React from 'react';
import { NavLink } from 'react-router-dom';

const NavUpdData = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="mobleft1em adminlvl3" exact to={`/admin/upd/normal/image`}>Update Images</NavLink>}
        </>
    );
};

export default NavUpdData;