import React, { useState } from 'react';
import GetAddHook from '../../hooks/AdminHooks';
import adminservice from '../../../serv/adminservice'

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'generation': 0 });
    return (
        <tr key={data.pid}>
            <td><img alt={data.name} src={data.img} /></td>
            <td>{data.number}</td>
            <td><input type="button" value="Hide" onClick={e => hideEngine(e, data.pid)} /></td>
            <td>{data.name}</td>
            <td><input type="button" value="Gen 1" onClick={e => setInfo({'generation': 1})} /></td>
            <td><input type="button" value="Gen 2" onClick={e => setInfo({'generation': 2})} /></td>
            <td><input type="button" value="Gen 3" onClick={e => setInfo({'generation': 3})} /></td>
            <td><input type="button" value="Gen 4" onClick={e => setInfo({'generation': 4})} /></td>
            <td><input type="button" value="Gen 5" onClick={e => setInfo({'generation': 5})} /></td>
            <td><input type="button" value="Gen 6" onClick={e => setInfo({'generation': 6})} /></td>
            <td><input type="button" value="Gen 7" onClick={e => setInfo({'generation': 7})} /></td>
            <td><input type="button" value="Gen 8" onClick={e => setInfo({'generation': 8})} /></td>
            <td>&nbsp;</td>
            <td><input type="text" readOnly style={{ width: '4em', textAlign: 'center' }} placeholder="Choose" value={info.generation !== 0 ? info.generation : "Choose"} /></td>
            <td>&nbsp;</td>
            <td><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
    );
};

const AddGeneration = () => {
    const [notDefined, setNotDefined] = useState([]);

    const hideEngine = (e, id) => {
        const newList = notDefined.filter( p => p.pid !== id );
        setNotDefined(newList);
    };

    const updEngine = (e, id, status) => {
        e.stopPropagation();
        if(status.generation !== 0) {
        const type = "generation";
        adminservice.patchAddData(id, status, type)
        .then(res => {
            hideEngine(e, id);
        }).catch(err => {
          if(err.response.status === 400){ window.alert("Generation required (in number format).");
          } else if(err.response.status === 403){ window.alert("Generation is already defined.");
          } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
          } else { window.alert("Unknown error, please try again later."); };
        });
        } else {
            window.alert("You must choose generation before sending it!");
        };
    };

    return (
        <>
        <GetAddHook setList={setNotDefined} type={"generation"} />
        <h3 className="centered">Set generation info</h3>
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
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Generation?</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {notDefined.slice(0, 9).map(nR => <SingleLine key={nR.pid} id={nR.pid} data={nR} hideEngine={hideEngine} updEngine={updEngine} />)}
            </tbody>
        </table>
        </div>
        </>
    );
};

export default AddGeneration;