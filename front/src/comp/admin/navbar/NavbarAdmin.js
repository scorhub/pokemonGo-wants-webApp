import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavAdminPrints from "./NavAdminPrints";

const NavbarAdmin = ({ucid}) => {
    const [showPrints, setShowPrints] = useState(false);
    return (
        <>
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/adddata`}>Add Pokémon</NavLink>}
        {ucid === 1 && <NavLink exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowPrints(!showPrints)}>Prints {showPrints ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showPrints && <NavAdminPrints ucid={ucid} />}
        </>
    );
};

export default NavbarAdmin;