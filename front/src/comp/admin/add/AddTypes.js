import React, { useState } from 'react';
import GetAddHook from '../../hooks/AdminHooks';
import apiService from '../../../serv/apiservice'

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'type1': '', 'type2': '' });

    const setUpdField = (value, fieldname) => {
        const tempUpdate = { ...info };
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
            <td>&nbsp;</td>
            <td>{data.type1 === null ? <input type="text" onChange={e => setUpdField(e.target.value, "type1")} value={info.type1} placeholder="Type 1" required /> : <input readOnly placeholder="Type 1" value={data.type1} /> } </td>
            <td rowSpan="2"><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
        <tr>
            <td><input type="button" value="None" onClick={e => setInfo({'type1': '', 'type2': 'None'})} /></td>
            <td><input type="text" onChange={e => setUpdField(e.target.value, "type2")} value={info.type2} placeholder="Type 2" /></td>
        </tr>
        </>
    );
};

const AddTypes = () => {
    const [notDefined, setNotDefined] = useState([]);

    const hideEngine = (e, id) => {
        const newList = notDefined.filter( p => p.pid !== id );
        setNotDefined(newList);
    };

    const updEngine = (e, id, status) => {
        e.stopPropagation();
        if(status.type1 !== "" || status.type2 !== "") {
            let sendStatus = {};
            if(status.type1 !== '') { sendStatus.type1 = status.type1}
            if(status.type2 !== '') { sendStatus.type2 = status.type2}
            const type = "type";
            apiService.patchAddData(id, sendStatus, type)
            .then(res => {
                hideEngine(e, id);
            }).catch(err => {
            if(err.response.status === 400){ window.alert("Type required.");
            } else if(err.response.status === 403){ window.alert("Type(s) are already defined.");
            } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
            } else { window.alert("Unknown error, please try again later."); };
            });
        } else {
            window.alert("You must choose at least one type!");
        };
    };

    return (
        <>
        <GetAddHook setList={setNotDefined} type={"type"} />
        <h3 className="centered">Set type(s) info</h3>
        <div className="left1em">
        <table>
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Number</th>
                    <th>&nbsp;</th>
                    <th>Name</th>
                    <th>&nbsp;</th>
                    <th>Type(s)?</th>
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

export default AddTypes;