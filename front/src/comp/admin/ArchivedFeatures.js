import React, { useState } from 'react';
import adminservice from '../../serv/adminservice';
import { GetArchFeatsHook } from '../hooks/AdminHooks';

const FeatureAddWindow = ({noteMotor, newNote, setNewNote, setShow}) => {
    
    const setRegField = (value, fieldname) => {
        const tempData = { ...newNote };
        tempData[fieldname] = value;
        setNewNote(tempData);
    };

    return (
        <div className="editwindow">
        <button className="editclosebutton" onClick={e=>setShow(false)}>Close</button>
            <h4>Add note.</h4>
            <form onSubmit={e => { noteMotor(e) }}>
                <input type="text" size="50" onChange={e => setRegField(e.target.value, "dnote")} autoFocus="autofocus" required value={newNote.dnote} />
                <div className="button">
                    <br/>
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

const SingleFeature = ({feat, ucid, changeEngine, changeMotor, setNewNote, setShow}) => {
    const featureStatus = feat.completed ? "readyfeature" : feat.inprogress ? "wipfeature" : feat.addedtolist ? "listfeature" : "";

    const openAdd = (e) => {
        e.preventDefault();
        setNewNote({"afid": feat.afid, "dnote": ""});
        setShow(true);
    };

    return (
    <tr className={featureStatus}>
        <td>{new Date(feat.afdate).toLocaleDateString()}</td>
        <td>{feat.aftitle}</td>
        <td>{feat.afinfo}</td>
        <td>{feat.showname}</td>
        {ucid === 1 && <>
        <td><input type="checkbox" defaultChecked={feat.addedtolist} onClick={(e) => changeEngine(e, feat.afid, {"addedtolist": !feat.addedtolist})} /></td>
        <td><input type="checkbox" defaultChecked={feat.inprogress} onClick={(e) => changeEngine(e, feat.afid, {"inprogress": !feat.inprogress})} /></td>
        <td><input type="checkbox" defaultChecked={feat.completed} onClick={(e) => changeEngine(e, feat.afid, {"completed": !feat.completed})} /></td>
        <td>{feat.dnote === null ? <button onClick={(e)=>openAdd(e)} >ADD</button>: feat.dnote}</td>
        <td>&nbsp;&nbsp;<i className="fa fa-refresh fa-lg" aria-hidden="true" onClick={(e) => changeMotor(e, feat.afid, {"farchived": !feat.farchived})}  /></td>
        </>}
    </tr>
    );
};

const ArchivedFeatures = () => {
    const [features, setFeatures] = useState([]);
    const [show, setShow] = useState(false)
    const [newNote, setNewNote] = useState({"afid": "", "dnote": ""});
    const ucid = JSON.parse(window.localStorage.getItem('loggedWantAppUser')).ucid;

    const changeEngine = (e, id, data) => {
        e.stopPropagation();
        adminservice.patchFeature(id, data)
        .then(res => { window.location.reload(); })
        .catch(err => { window.alert('Something went wrong :(') });
    };

    const changeMotor = (e, id, data) => {
        e.stopPropagation();
        if(window.confirm("This will set the feature post visible.")){changeEngine(e, id, data); };
    };

    const noteMotor = (e) => {
        e.stopPropagation();
        changeEngine(e, newNote.afid, {"dnote": newNote.dnote});
    };

    return (
    <>
    <GetArchFeatsHook setList={setFeatures} />
    <div className="item">
        {show && <FeatureAddWindow noteMotor={noteMotor} newNote={newNote} setNewNote={setNewNote} setShow={setShow} />}
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Feature</th>
                    <th>Additional information</th>
                    <th>Made by</th>
                    <th>On List</th>
                    <th>WIP</th>
                    <th>Ready</th>
                    <th>Note</th>
                    <th>Release</th>
                </tr>
            </thead>
            <tbody>
                {features.map(feat => <SingleFeature key={feat.afid} feat={feat} ucid={ucid} changeEngine={changeEngine} changeMotor={changeMotor} setNewNote={setNewNote} setShow={setShow} />)}
            </tbody>
        </table>
    </div>
    </>
    );
};

export default ArchivedFeatures;