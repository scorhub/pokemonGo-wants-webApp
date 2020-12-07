import React from 'react';
import EventsEditButton from '../admin/events/EventsEditButton';

const EventBox = ({event, ucid, setEditEvent, editEvent, setShow, type}) => {
    let startdate = new Date(event.estart).toLocaleDateString();
    let enddate = new Date(event.eend).toLocaleDateString();
    let startime = new Date(event.estart).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");
    let endtime = new Date(event.eend).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");

    return (
    <div className="textbox">
        {type === "events" ?
        ucid === 1 && <EventsEditButton event={event} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} /> 
        :
        type === "pastevents" && <EventsEditButton event={event} setEditEvent={setEditEvent} editEvent={editEvent} setShow={setShow} />
        }
        <h3>{event.ename}&nbsp;&nbsp;&nbsp;{event.elink !== null && <a href={event.elink} target="blank" ><i className="fa fa-external-link" aria-hidden="true"/>{null}</a>}</h3>
        <h4>{startdate}&nbsp;{startime}&nbsp;-{enddate !== startdate && <>&nbsp;{enddate}</>}&nbsp;{endtime}</h4>
        <div dangerouslySetInnerHTML={{ __html: event.etext }} />
        <br/>
        <i>Published&nbsp;{new Date(event.ewritedate).toLocaleDateString()}</i>
    </div>
    );
};

export default EventBox;