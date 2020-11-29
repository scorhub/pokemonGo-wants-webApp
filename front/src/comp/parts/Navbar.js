import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavWantsDrop from "./NavWantsDrop";
import NavbarAdmin from "../admin/navbar/NavbarAdmin";

const Navbar = () => {
  const [showWants, setShowWants] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const ucid = JSON.parse(window.localStorage.getItem('loggedWantAppUser')).ucid;

  let showMore = () => {
    var x = document.getElementById("activeNavbar");
    if (x.className === "navbar") { x.className += " responsive";
    } else { x.className = "navbar"; };
  };

  window.onclick = function(e) {
    let x = document.getElementById("activeNavbar");
    if (!e.target.matches('.icon') && !e.target.matches('#icon') && !e.target.matches('#showmemore')) {
      if (x.classList.contains('responsive')) { x.classList.remove('responsive'); };
    };
  };

  const doLogout = () => {
    window.localStorage.removeItem('loggedWantAppUser');
    window.location.href = "";
  };

  return (
    <div className="navbar" id="activeNavbar">
          <NavLink exact to={`/`} activeClassName="active">Front</NavLink>
          <NavLink exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowWants(!showWants)}>Wants {showWants ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>
        {showWants && <NavWantsDrop />}
          <NavLink exact to={`/otherwants`} activeClassName="active">Others Wants</NavLink>
          <NavLink exact to={`/askfeature`} activeClassName="active">Ask Feature</NavLink>
        
        {(ucid === 1 || 2) && <NavLink exact to="#" activeClassName="notactive" id="showmemore" onClick={e => setShowAdmin(!showAdmin)}>{ucid === 1 ? "Admin " : "Moderator "}{showAdmin ? <i className="fa fa-caret-up"></i> : <i className="fa fa-caret-down"></i>}</NavLink>}
        {showAdmin && <NavbarAdmin ucid={ucid} />}

        <NavLink exact to="#" activeClassName="notactive" onClick={e => doLogout()}>Log Out</NavLink>
        <NavLink to="#" className="icon" onClick={e => showMore()}><i className="fa fa-bars" id="icon"></i></NavLink>
    </div>
  );
};

export default Navbar;