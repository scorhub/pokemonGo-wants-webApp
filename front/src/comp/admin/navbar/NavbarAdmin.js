import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import NavNewsEvents from './NavNewsEvents';
import NavAddPokemons from './NavAddPokemons';
import NavAddData from './NavAddData';
import NavUpdData from './NavUpdData';

const NavDropAddData = ({ucid}) => {
    const [showAdder, setShowAdder] = useState(false);
    const [showModData, setShowModData] = useState(false);
    const [showUpdater, setShowUpdater] = useState(false);
    return (
        <>
        {ucid === 1 && <NavLink className="adminlvl2" exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowAdder(!showAdder)}>Add Pokémons {showAdder ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showAdder && <NavAddPokemons ucid={ucid} />}
        {(ucid === 1 || ucid === 2) && <NavLink className="adminlvl2" exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowModData(!showModData)}>Add Pokémon data {showModData ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showModData && <NavAddData ucid={ucid} />}
        {ucid === 1 && <NavLink className="adminlvl2" exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowUpdater(!showUpdater)}>Update Data {showUpdater ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showUpdater && <NavUpdData ucid={ucid} />}
        </>
    );
};

const NavbarAdmin = ({ucid}) => {
    const [showPublish, setShowPublish] = useState(false);
    const [showDataManager, setShowDataManager] = useState(false);
    return (
        <>
        {ucid === 1 && <NavLink className="adminlvl1" exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowPublish(!showPublish)}>News, Events &#38; Features {showPublish ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showPublish && <NavNewsEvents ucid={ucid} />}
        {(ucid === 1 || ucid === 2) && <NavLink className="adminlvl1" exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowDataManager(!showDataManager)}>Manage Pokémon Data {showDataManager ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showDataManager && <NavDropAddData ucid={ucid} />}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl1" exact to={`/admin/print`}>Prints</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl1" exact to={`/admin/users/moderator`}>Moderators</NavLink>}
        </>
    );
};

export default NavbarAdmin;