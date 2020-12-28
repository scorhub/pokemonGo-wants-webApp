import React, { useState } from 'react';
import GetAddHook from '../../hooks/AdminHooks';
import adminservice from '../../../serv/adminservice'

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'released': null });
    return (
        <tr key={data.pid}>
            <td><img alt={data.name} src={data.img} /></td>
            <td>{data.number}</td>
            <td><input type="button" value="Hide" onClick={e => hideEngine(e, data.pid)} /></td>
            <td>{data.name}</td>
            <td><input type="button" value="Released" onClick={e => setInfo({'released': true})} /></td>
            <td><input type="button" value="Not released" onClick={e => setInfo({'released': false})} /></td>
            <td><input type="text" readOnly style={{ width: '7em', textAlign: 'center' }} placeholder="Choose status" value={(info.released !== null && info.released === true) ? "Yes" : (info.released !== null && info.released === false) ? "No" : "Choose status"} /></td>
            <td><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
    );
};

const AddReleased = () => {
    const [notReleased, setNotReleased] = useState([]);

    const hideEngine = (e, id) => {
        const newList = notReleased.filter( p => p.pid !== id );
        setNotReleased(newList);
    };

    const updEngine = (e, id, status) => {
        e.stopPropagation();
        if(status.released === true || status.released === false) {
        const type = "released";
        adminservice.patchAddData(id, status, type)
        .then(res => {
            hideEngine(e, id);
        }).catch(err => {
          if(err.response.status === 400){ window.alert("Released info required (in boolean).");
          } else if(err.response.status === 403){ window.alert("Released info is already defined.");
          } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
          } else { window.alert("Unknown error, please try again later."); };
        });
        } else {
            window.alert("You must choose status before sending it!");
        };
    };

    return (
        <>
        <GetAddHook setList={setNotReleased} type={"released"} />
        <h3 className="centered">Set released info</h3>
        <div className="left1em">
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Number</th>
                    <th>&nbsp;</th>
                    <th>Name</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Released?</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {notReleased.slice(0, 9).map(nR => <SingleLine key={nR.pid} id={nR.pid} data={nR} hideEngine={hideEngine} updEngine={updEngine} />)}
            </tbody>
        </table>
        </div>
        </>
    );
};

export default AddReleased;