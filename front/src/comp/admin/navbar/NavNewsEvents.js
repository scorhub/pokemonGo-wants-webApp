import React from 'react';
import { NavLink } from 'react-router-dom';

const NavNewsEvents = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="mobleft1em adminlvl2" exact to={`/admin/news/write`}>Write News</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl2" exact to={`/admin/events/add`}>Add Event</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl2" exact to={`/admin/news/archived`}>Archived News</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl2" exact to={`/admin/events/past`}>Past Events</NavLink>}
        {ucid === 1 && <NavLink className="mobleft1em adminlvl2" exact to={`/admin/features/archived`}>Archived Features</NavLink>}
        </>
    );
};

export default NavNewsEvents;