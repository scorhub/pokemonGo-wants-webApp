import React from 'react';

const EventsEditButton = ({event, setEditEvent, setShow}) => {

    const openEdit = (e) => {
        e.preventDefault();
        let startDate = new Date(event.estart).toISOString().split(':')[0] + ":00";
        let endDate = new Date(event.eend).toISOString().split(':')[0] + ":00";
        let eventLink
        if(event.elink === null){ eventLink = "" } else { eventLink = event.elink };
        setEditEvent({"eid": event.eid, "ename": event.ename, "etext": event.etext, "estart": startDate, "eend": endDate, "elink": eventLink});
        setShow(true);
    };

    return (
        <div className="editbutton" >
            <button onClick={e=> openEdit(e) } >EDIT</button>
        </div>
    );
};

export default EventsEditButton;