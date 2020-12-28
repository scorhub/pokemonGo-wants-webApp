import React from 'react';

const EventsEditWindow = ({updEngine, editEvent, setEditEvent, setShow}) => {
    
    const setRegField = (value, fieldname) => {
        const tempData = { ...editEvent };
        tempData[fieldname] = value;
        setEditEvent(tempData);
    };

    return (
        <div className="editwindow">
            <h4>Edit post.</h4>
            <button className="editclosebutton" onClick={e=>setShow(false)}>Close</button>
            <form onSubmit={e => { updEngine() }}>
                <h5 className="formtitle">Title</h5>
                <input type="text" size="50" onChange={e => setRegField(e.target.value, "ename")} autoFocus="autofocus" required value={editEvent.ename} />
                <h5 className="formtitle">Event starts</h5>
                <input type="datetime-local" onChange={e => setRegField(e.target.value, "estart")} required value={editEvent.estart} />
                <h5 className="formtitle">Event ends</h5>
                <input type="datetime-local" onChange={e => setRegField(e.target.value, "eend")} required min={editEvent.estart} value={editEvent.eend} />
                <h5 className="formtitle">Text</h5>
                <textarea rows="15" cols="75" onChange={e => setRegField(e.target.value, "etext")} required value={editEvent.etext} />
                <div className="button">
                <h5 className="formtitle">External link to event information</h5>
                <input type="url" onChange={e => setRegField(e.target.value, "elink")} value={editEvent.elink} />
                    <br/>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

export default EventsEditWindow;