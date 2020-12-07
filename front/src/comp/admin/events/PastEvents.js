import React, { useState } from 'react';
import { GetPastEventsHook } from '../../hooks/AdminHooks';
import { NavLink } from "react-router-dom";
import apiService from '../../../serv/apiservice';
import EventsEditWindow from './EventsEditWindow';
import EventBox from '../../pages/EventBox';

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [editEvent, setEditEvent] = useState({"eid": "", "ename": "", "etext": "", "estart": "", "eend": "", "elink": ""});
    
    const updEngine = () => {
        apiService.patchEvents(editEvent.eid, {"ename": editEvent.ename, "etext": editEvent.etext, "estart": editEvent.estart, "eend": editEvent.eend, "elink": editEvent.elink})
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };

    return (
    <>
    <GetPastEventsHook setList={setPastEvents} />
    <div className="editwrapdiv">
    {show && <EventsEditWindow updEngine={updEngine} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} /> }
    </div>
    <h4>Past events.</h4>
    {pastEvents.map(event => <EventBox key={event.eid} event={event} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} type={"pastevents"} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default PastEvents;