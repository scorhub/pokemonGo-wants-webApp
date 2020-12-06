import React, { useState } from 'react';
import apiService from '../../../serv/apiservice';

const AddEvent = () => {
    const [newEvent, setNewEvent] = useState({"ename": "", "estart": "", "eend": "", "etext": "", "elink": ""});

    const addNews = (e) => {
        e.preventDefault();
        apiService.postEvent(newEvent)
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };
    
    const setRegField = (value, fieldname) => {
        const tempData = { ...newEvent };
        tempData[fieldname] = value;
        setNewEvent(tempData);
    };

    let minDate = new Date().toISOString().split('T')[0] + "T00:00";

    return (
    <div className="item">
        <h4>Add Event.</h4>
        <form onSubmit={e => { addNews(e) }}>
            <h5 className="formtitle">Event name</h5>
            <input type="text" onChange={e => setRegField(e.target.value, "ename")} autoFocus="autofocus" required value={newEvent.ename} />
            <h5 className="formtitle">Event starts</h5>
            <input type="datetime-local" onChange={e => setRegField(e.target.value, "estart")} autoFocus="autofocus" required min={minDate} value={newEvent.estart} />
            <h5 className="formtitle">Event ends</h5>
            <input type="datetime-local" onChange={e => setRegField(e.target.value, "eend")} autoFocus="autofocus" required min={newEvent.estart} value={newEvent.eend} />
            <h5 className="formtitle">Event text</h5>
            <textarea rows="8" cols="50" onChange={e => setRegField(e.target.value, "etext")} required value={newEvent.etext} />
            <h5 className="formtitle">External link to event information</h5>
            <input type="url" onChange={e => setRegField(e.target.value, "elink")} autoFocus="autofocus" value={newEvent.elink} />
            <div className="button">
                <br />
                <button type="submit">Send</button>
            </div>
        </form>
        <br />
        Starred (*) fields are required.
    </div>
    );
};

export default AddEvent;