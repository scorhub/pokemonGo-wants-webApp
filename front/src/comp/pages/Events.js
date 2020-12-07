import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { EventsHook } from '../hooks/CommonHooks';
import apiService from '../../serv/apiservice';
import EventsEditWindow from '../admin/events/EventsEditWindow';
import EventBox from './EventBox';

const Events = () => {
    const [eventList, setEventList] = useState([]);
    const [show, setShow] = useState(false);
    const [editEvent, setEditEvent] = useState({"eid": "", "ename": "", "etext": "", "estart": "", "eend": "", "elink": ""});
    const ucid = JSON.parse(window.localStorage.getItem('loggedWantAppUser')).ucid;
    console.log(editEvent)
    
    const updEngine = () => {
        apiService.patchEvents(editEvent.eid, {"ename": editEvent.ename, "etext": editEvent.etext, "estart": editEvent.estart, "eend": editEvent.eend, "elink": editEvent.elink})
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };

    return (
    <>
    <EventsHook setList={setEventList} />
    <div className="editwrapdiv">
    {show && <EventsEditWindow updEngine={updEngine} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} /> }
    </div>
    {eventList.map(event => <EventBox key={event.eid} event={event} ucid={ucid} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} type={"events"} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default Events;