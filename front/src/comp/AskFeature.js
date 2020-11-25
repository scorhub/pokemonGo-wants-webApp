import React, { useState } from 'react';
import apiService from '../serv/apiservice';
import GetFeaturesHook from './hooks/GetFeaturesHook';

const AskFeature = () => {
    const [newAsk, setNewAsk] = useState({ "aftitle": "", "afinfo": "" });
    const [features, setFeatures] = useState([]);

    const doSubmit = e => {
        e.stopPropagation();
        apiService.askFeature(newAsk)
        .then(res => { })
        .catch(e => { alert('Something went wrong.') });
    };

    const setUpdField = (value, fieldname) => {
        const tempUpdate = { ...newAsk };
        tempUpdate[fieldname] = value;
        setNewAsk(tempUpdate);
    };

    const SingleAsk = ({onefeat}) => {
        return (
        <tr key={onefeat.afid}>
            <td>{new Date(onefeat.afdate).toLocaleDateString()}</td>
            <td>{onefeat.aftitle}</td>
            <td>{onefeat.afinfo}</td>
            <td>{onefeat.showname}</td>
        </tr>
        );
    };

    return (
    <>
    <GetFeaturesHook setList={setFeatures} />
    <div className="item">
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Feature</th>
                    <th>Additional information</th>
                    <th>Made by</th>
                </tr>
            </thead>
            <tbody>
                {features.map(onefeat => <SingleAsk key={onefeat.afid} onefeat={onefeat} />)}
            </tbody>
        </table>
    </div>
    <div className="item">
        <h5>Ask a feature</h5>
        <form onSubmit={e => {doSubmit(e); e.stopPropagation();}}>
            <input type="text" onChange={e => setUpdField(e.target.value, "aftitle")} value={newAsk.aftitle} placeholder="Feature" required /><br />
            <textarea onChange={e => setUpdField(e.target.value, "afinfo")} value={newAsk.afinfo} rows="5" cols="30" placeholder="Additional information (non-compulsory)" /><br />
            <input className="button" type="submit" />
        </form>
    </div>
    </>
    );
};

export default AskFeature;