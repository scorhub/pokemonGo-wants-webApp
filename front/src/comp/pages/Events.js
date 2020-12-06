import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import EventsHook from '../hooks/EventsHook';

const EventBox = ({event}) => {
    let startdate = new Date(event.estart).toLocaleDateString();
    let enddate = new Date(event.eend).toLocaleDateString();
    let startime = new Date(event.estart).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");
    let endtime = new Date(event.eend).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");

    return (
    <div className="textbox">
        <h3>{event.ename}&nbsp;&nbsp;&nbsp;{event.elink !== null && <a href={event.elink} target="blank" ><i className="fa fa-external-link" aria-hidden="true"/>{null}</a>}</h3>
        <h4>{startdate}&nbsp;{startime}&nbsp;-{enddate !== startdate && <>&nbsp;{enddate}</>}&nbsp;{endtime}</h4>
        <div dangerouslySetInnerHTML={{ __html: event.etext }} />
        <br/>
        <i>Published&nbsp;{new Date(event.ewritedate).toLocaleDateString()}</i>
    </div>
    );
};

const Events = () => {
    const [newsList, setNewsList] = useState([]);
    return (
    <>
    <EventsHook setList={setNewsList} />
    
    {newsList.map(event => <EventBox key={event.eid} event={event} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default Events;