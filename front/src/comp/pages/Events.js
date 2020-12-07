import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { EventsHook } from '../hooks/CommonHooks';
import apiService from '../../serv/apiservice';

const EditWindow = ({updEngine, editEvent, setEditEvent, setShow, id}) => {
    
    const setRegField = (value, fieldname) => {
        const tempData = { ...editEvent };
        tempData[fieldname] = value;
        setEditEvent(tempData);
    };

    let minDate = new Date().toISOString().split('T')[0] + "T00:00";

    return (
        <div className="editwindow">
            <h4>Edit post.</h4>
            <button className="editclosebutton" onClick={e=>setShow(false)}>Close</button>
            <form onSubmit={e => { updEngine() }}>
                <h5 className="formtitle">Title</h5>
                <input type="text" size="50" onChange={e => setRegField(e.target.value, "ename")} autoFocus="autofocus" required value={editEvent.ename} />
                <h5 className="formtitle">Event starts</h5>
                <input type="datetime-local" onChange={e => setRegField(e.target.value, "estart")} required min={minDate} value={editEvent.estart} />
                <h5 className="formtitle">Event ends</h5>
                <input type="datetime-local" onChange={e => setRegField(e.target.value, "eend")} required min={editEvent.estart} value={editEvent.eend} />
                <h5 className="formtitle">Text</h5>
                <textarea rows="15" cols="75" onChange={e => setRegField(e.target.value, "etext")} required value={editEvent.etext} />
                <div className="button">
                <h5 className="formtitle">External link to event information</h5>
                <input type="url" onChange={e => setRegField(e.target.value, "elink")} value={editEvent.elink} />
                    <br />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

const EditButton = ({event, setEditEvent, setShow}) => {

    const openEdit = (e) => {
        e.preventDefault();
        let startDate = new Date(event.estart).toISOString().split(':')[0] + ":00";
        let endDate = new Date(event.eend).toISOString().split(':')[0] + ":00";
        setEditEvent({"eid": event.eid, "ename": event.ename, "etext": event.etext, "estart": startDate, "eend": endDate, "elink": event.elink});
        setShow(true);
    };

    return (
        <div className="editbutton" >
            <button onClick={e=> openEdit(e) } >EDIT</button>
        </div>
    );
};

const EventBox = ({event, ucid, setEditEvent, editEvent, setShow}) => {
    let startdate = new Date(event.estart).toLocaleDateString();
    let enddate = new Date(event.eend).toLocaleDateString();
    let startime = new Date(event.estart).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");
    let endtime = new Date(event.eend).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");

    return (
    <div className="textbox">
        {ucid === 1 && <EditButton event={event} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} /> }
        <h3>{event.ename}&nbsp;&nbsp;&nbsp;{event.elink !== null && <a href={event.elink} target="blank" ><i className="fa fa-external-link" aria-hidden="true"/>{null}</a>}</h3>
        <h4>{startdate}&nbsp;{startime}&nbsp;-{enddate !== startdate && <>&nbsp;{enddate}</>}&nbsp;{endtime}</h4>
        <div dangerouslySetInnerHTML={{ __html: event.etext }} />
        <br/>
        <i>Published&nbsp;{new Date(event.ewritedate).toLocaleDateString()}</i>
    </div>
    );
};

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
    {show && <EditWindow updEngine={updEngine} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} /> }
    </div>
    {eventList.map(event => <EventBox key={event.eid} event={event} ucid={ucid} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default Events;