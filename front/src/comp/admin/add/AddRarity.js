import React, { useState } from 'react';
import GetAddHook from '../../hooks/AdminHooks';
import apiService from '../../../serv/apiservice'

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'rarity': null });
    return (
        <tr key={data.pid}>
            <td><img alt={data.name} src={data.img} /></td>
            <td>{data.number}</td>
            <td><input type="button" value="Hide" onClick={e => hideEngine(e, data.pid)} /></td>
            <td>{data.name}</td>
            <td><input type="button" value="Common" onClick={e => setInfo({'rarity': 'Common'})} /></td>
            <td><input type="button" value="Uncommon" onClick={e => setInfo({'rarity': 'Uncommon'})} /></td>
            <td><input type="button" value="Rare" onClick={e => setInfo({'rarity': 'Rare'})} /></td>
            <td><input type="button" value="Legendary" onClick={e => setInfo({'rarity': 'Legendary'})} /></td>
            <td><input type="button" value="Mythical" onClick={e => setInfo({'rarity': 'Mythical'})} /></td>
            <td><input type="text" readOnly style={{ width: '7em', textAlign: 'center' }} placeholder="Choose status" value={info.rarity !== null ? info.rarity : "Choose status"} /></td>
            <td><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
    );
};

const AddRarity = () => {
    const [notDefined, setNotDefined] = useState([]);

    const hideEngine = (e, id) => {
        const newList = notDefined.filter( p => p.pid !== id );
        setNotDefined(newList);
    };

    const updEngine = (e, id, status) => {
        e.stopPropagation();
        if(status.rarity !== null) {
        const type = "rarity";
        apiService.patchAddData(id, status, type)
        .then(res => {
            hideEngine(e, id);
        }).catch(err => {
          if(err.response.status === 400){ window.alert("Rarity required.");
          } else if(err.response.status === 403){ window.alert("Rarity is already defined.");
          } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
          } else { window.alert("Unknown error, please try again later."); };
        });
        } else {
            window.alert("You must choose rarity before sending it!");
        };
    };

    return (
        <>
        <GetAddHook setList={setNotDefined} type={"rarity"} />
        <h3 className="centered">Set rarity info</h3>
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
                    <th>Rarity?</th>
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

export default AddRarity;