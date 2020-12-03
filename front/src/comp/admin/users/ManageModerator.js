import React, { useState } from 'react';
import apiService from '../../../serv/apiservice';
import { GetModHook } from '../../hooks/AdminHooks';

const SingleUser = ({data, updEngine}) => {
    const [info, setInfo] = useState({ 'moderator': null });
    return (
        <tr>
            <td>{data.showname}</td>
            <td>&nbsp;</td>
            <td>{data.ucname}</td>
            <td><input type="button" value="Give Rights" onClick={e => setInfo({'moderator': true})} /></td>
            <td><input type="button" value="Revoke" onClick={e => setInfo({'moderator': false})} /></td>
            <td>{info.moderator === null ? <input readOnly placeholder="Type 1" value={data.ucname} style={{ width: '7em', textAlign: 'center' }} /> : <input type="text" readOnly style={{ width: '7em', textAlign: 'center' }} placeholder="Choose status" value={(info.moderator !== null && info.moderator === true) ? "Give rights" : (info.moderator !== null && info.moderator === false) ? "Revoke rights" : "Choose status"} /> } </td>
            <td><input type="button" value="Update" onClick={e => updEngine(e, data.uid, info, data.ucid)} /></td>
        </tr>
    );
};

const ManageModerator = () => {
    const [userInfo, setUserInfo] = useState([]);

    const updEngine = (e, id, status, curRights) => {
        e.stopPropagation();
        if(status.moderator !== null) {
            if(curRights === 2 && status.moderator === true){ window.alert("User is already admin!");
            } else if(curRights === 3 && status.moderator === false){ window.alert("User is already regular user!");
            } else {
                apiService.patchModData(id, status)
                .then(res => {
                    window.location.reload();
                }).catch(err => {
                if(err.response.status === 400){ window.alert("Mega information required (in boolean).");
                } else if(err.response.status === 403){ window.alert("Mega information is already defined.");
                } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
                } else { window.alert("Unknown error, please try again later."); };
                });
            };
        } else {
            window.alert("No update selected!");
        };
    };

    return (
        <>
        <GetModHook setList={setUserInfo} />
        <div>
            <h3 className="centered">Manage moderator status</h3>
        </div>
        <div className="left1em">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>&nbsp;</th>
                    <th>Class</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>Status</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {userInfo.filter(u => u.ucid !== 3).map(u => <SingleUser key={u.uid} id={u.pid} data={u} updEngine={updEngine} />)}
            </tbody>
        </table>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {userInfo.filter(u => u.ucid === 3).map(u => <SingleUser key={u.uid} id={u.pid} data={u} updEngine={updEngine} />)}
            </tbody>
        </table>
        </div>
        </>
    );
};

export default ManageModerator;