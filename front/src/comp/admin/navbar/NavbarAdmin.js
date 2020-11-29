import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavAdminPrints from "./NavAdminPrints";
import NavAddData from './NavAddData';

const NavbarAdmin = ({ucid}) => {
    const [showPrints, setShowPrints] = useState(false);
    const [showModData, setShowModData] = useState(false);
    return (
        <>
        {ucid === 1 && <NavLink exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowPrints(!showPrints)}>Prints {showPrints ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showPrints && <NavAdminPrints ucid={ucid} />}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/add/pokemon`}>Add Pokémon</NavLink>}
        {(ucid === 1 || 2) && <NavLink exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowModData(!showModData)}>Add Pokémon data {showModData ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showModData && <NavAddData ucid={ucid} />}
        </>
    );
};

export default NavbarAdmin;