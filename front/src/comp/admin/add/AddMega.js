import React, { useState } from 'react';
import GetAddHook from '../../hooks/AdminHooks';
import adminservice from '../../../serv/adminservice'

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'mega': null });
    return (
        <tr key={data.pid}>
            <td><img alt={data.name} src={data.img} /></td>
            <td>{data.number}</td>
            <td><input type="button" value="Hide" onClick={e => hideEngine(e, data.pid)} /></td>
            <td>{data.name}</td>
            <td><input type="button" value="Mega added" onClick={e => setInfo({'mega': true})} /></td>
            <td><input type="button" value="Not added" onClick={e => setInfo({'mega': false})} /></td>
            <td><input type="text" readOnly style={{ width: '7em', textAlign: 'center' }} placeholder="Choose status" value={(info.mega !== null && info.mega === true) ? "Yes" : (info.mega !== null && info.mega === false) ? "No" : "Choose status"} /></td>
            <td><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
    );
};

const AddMega = () => {
    const [notMega, setNotMega] = useState([]);

    const hideEngine = (e, id) => {
        const newList = notMega.filter( p => p.pid !== id );
        setNotMega(newList);
    };

    const updEngine = (e, id, status) => {
        e.stopPropagation();
        if(status.mega === true || status.mega === false) {
        const type = "mega";
        adminservice.patchAddData(id, status, type)
        .then(res => {
            hideEngine(e, id);
        }).catch(err => {
          if(err.response.status === 400){ window.alert("Mega information required (in boolean).");
          } else if(err.response.status === 403){ window.alert("Mega information is already defined.");
          } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
          } else { window.alert("Unknown error, please try again later."); };
        });
        } else {
            window.alert("You must choose status before sending it!");
        };
    };

    return (
        <>
        <GetAddHook setList={setNotMega} type={"mega"} />
        <h3 className="centered">Set mega evolution info</h3>
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
                    <th>Mega evolution?</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {notMega.slice(0, 9).map(nR => <SingleLine key={nR.pid} id={nR.pid} data={nR} hideEngine={hideEngine} updEngine={updEngine} />)}
            </tbody>
        </table>
        </div>
        </>
    );
};

export default AddMega;