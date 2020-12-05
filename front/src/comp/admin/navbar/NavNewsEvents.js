import React from 'react';
import { NavLink } from 'react-router-dom';

const NavNewsEvents = ({ucid}) => {
    return (
        <>
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/news/write`}>Write News</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/events/add`}>Add Event</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/news/modify`}>Modify News</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/events/modify`}>Modify Event</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/news/archived`}>Archived News</NavLink>}
        {ucid === 1 && <NavLink className="left1em" exact to={`/admin/events/past`}>Past Events</NavLink>}
        </>
    );
};

export default NavNewsEvents;