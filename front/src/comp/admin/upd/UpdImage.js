import React, { useState, useEffect } from 'react';
import adminService from '../../../serv/adminservice';

const SingleLine = ({data, hideEngine, updEngine}) => {
    const [info, setInfo] = useState({ 'img': '' });
    return (
        <tr key={data.pid}>
            <td><img alt={data.name} src={data.img} /></td>
            <td>{data.number}</td>
            <td><input type="button" value="Hide" onClick={e => hideEngine(e, data.pid)} /></td>
            <td>{data.name}</td>
            <td><input type="text" onChange={e => setInfo({'img': e.target.value})} value={info.img} required/></td>
            <td><input type="button" value="Send data" onClick={e => updEngine(e, data.pid, info)} /></td>
        </tr>
    );
};

const UpdImage = () => {
    const [notUpdated, setNotUpdated] = useState([]);
    const [filterDate, setFilterDate] = useState({"fdate": null});
    
    const getupdhook = () => {
        if(filterDate.fdate !== null){
            adminService.getUpdData("normal", "image", filterDate.fdate)
            .then(res => { setNotUpdated(res) })
            .catch(err => { window.alert('Error in updating image.') });
        };};
    useEffect(getupdhook, [filterDate]);

    const hideEngine = (e, id) => {
        const newList = notUpdated.filter( p => p.pid !== id );
        setNotUpdated(newList);
    };

    const updEngine = (e, id, status) => {
        e.stopPropagation();
        if(status.img.startsWith('http')) {
            const type = "normal";
            const type2 = "image";
            adminService.patchUpdData(id, status, type, type2)
            .then(res => {
                hideEngine(e, id);
            }).catch(err => {
            if(err.response.status === 400){ window.alert("Released info required (in boolean).");
            } else if(err.response.status === 403){ window.alert("Released info is already defined.");
            } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
            } else { window.alert("Unknown error, please try again later."); };
            });
        } else {
            window.alert("Image must be in url-form!");
        };
    };

    return (
        <>
        <div className="item">
            Select filter date
            <br/>
            <br/>
            <input type="date" onChange={e => setFilterDate({"fdate": e.target.value})} />
        </div>
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
                </tr>
            </thead>
            <tbody>
                {notUpdated.slice(0, 9).map(nUpd => <SingleLine key={nUpd.pid} id={nUpd.pid} data={nUpd} hideEngine={hideEngine} updEngine={updEngine} />)}
            </tbody>
        </table>
        </div>
        </>
    );
};

export default UpdImage;