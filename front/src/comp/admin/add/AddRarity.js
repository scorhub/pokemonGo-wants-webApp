import React, { useState } from 'react';
import GetAddHook from '../../hooks/AdminHooks';
import adminservice from '../../../serv/adminservice'

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'rarity': null, 'subrarity': null });

    const setUpdField = (fieldname, value) => {
        const tempUpdate = { ...info };
        if(info.rarity === null && data.rarity !== null){ tempUpdate.rarity = data.rarity; };
        tempUpdate[fieldname] = value;
        setInfo(tempUpdate);
    };
    return (
        <>
        <tr key={data.pid}>
            <td rowSpan="2"><img alt={data.name} src={data.img} /></td>
            <td rowSpan="2">{data.number}</td>
            <td rowSpan="2"><input type="button" value="Hide" onClick={e => hideEngine(e, data.pid)} /></td>
            <td rowSpan="2">{data.name}</td>
            <td><input type="button" value="Common" onClick={e => setUpdField('rarity', 'Common')} /></td>
            <td><input type="button" value="Uncommon" onClick={e => setUpdField('rarity', 'Uncommon')} /></td>
            <td><input type="button" value="Rare" onClick={e => setUpdField('rarity', 'Rare')} /></td>
            <td><input type="button" value="Legendary" onClick={e => setUpdField('rarity', 'Legendary')} /></td>
            <td><input type="button" value="Mythical" onClick={e => setUpdField('rarity', 'Mythical')} /></td>
            <td>{data.rarity === null ? <input type="text" readOnly style={{ width: '7em', textAlign: 'center' }} placeholder="Choose rarity" value={info.rarity !== null ? info.rarity : "Choose rarity"} /> : <input readOnly placeholder="Rarity" style={{ width: '7em', textAlign: 'center', background: 'lightgreen' }} value={data.rarity} /> }</td>
            <td rowSpan="2"><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
        <tr>
            <td>&nbsp;</td>
            <td><input type="button" value="None" onClick={e => setUpdField('subrarity', 'None')} /></td>
            <td><input type="button" value="Mythical" onClick={e => setUpdField('subrarity', 'Mythical')} /></td>
            <td><input type="button" value="Seasonal" onClick={e => setUpdField('subrarity', 'Seasonal')} /></td>
            <td><input type="button" value="Hatched" onClick={e => setUpdField('subrarity', 'Hatched')} /></td>
            <td>{data.subrarity === null ? <input type="text" readOnly style={{ width: '7em', textAlign: 'center' }} placeholder="Choose subrarity" value={info.subrarity !== null ? info.subrarity : "Choose subrarity"} /> : <input readOnly placeholder="Subrarity" style={{ width: '7em', textAlign: 'center', background: 'lightgreen' }} value={data.rarity} /> }</td>
        </tr>
        </>
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
        adminservice.patchAddData(id, status, type)
        .then(res => {
            hideEngine(e, id);
        }).catch(err => {
          if(err.response.status === 400){ window.alert("Rarity required.");
          } else if(err.response.status === 403){ window.alert("Rarity is already defined.");
          } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
          } else { window.alert("Unknown error, please try again later."); };
        });
        } else {
            window.alert("Rarity must be chosen before sending data!");
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