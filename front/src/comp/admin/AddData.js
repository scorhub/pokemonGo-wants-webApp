import React, { useState } from 'react';
import apiService from '../../serv/apiservice';
import GetCountHook from '../hooks/GetCountHook';

const AddData = () => {
    const [count, setCount] = useState([]);
    const [newData, setnewData] = useState( { "number": "", "name": "" });
    const biggestid = count +1;

    const addNewData = (e) => {
        e.preventDefault();
        apiService.addData(newData)
        .then(res => { })
        .catch(e => { alert('Something went wrong.') });
    };

    const setRegField = (value, fieldname) => {
        const tempData = { ...newData };
        tempData[fieldname] = value;
        setnewData(tempData);
    };

    return (
        <>
        <GetCountHook setList={setCount} />
        <div className="item">
            <h4>Add new Pokémon.</h4>
            <p>Number of next Pokémon: {biggestid}</p>
            <form onSubmit={e => { addNewData(e) }}>
                {/* <h5 className="formtitle">Pokédex entry number *</h5>
                <input type="number" onChange={e => setRegField(e.target.value, "number")} required value={newData.number} /> */}
                {/* App automatically counts entry numbers from one to up, handy when building database from ground. For later add-ons (like Meltan or other Pokémons that are added game in random order, rather than in numerical), selecting entry number manually is required. */}
                <h5 className="formtitle">Name *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "name")} autoFocus="autofocus" required value={newData.name} />
                <div className="button">
                    <br />
                    <button type="submit">Add Pokémon</button>
                </div>
            </form>
            <br />
            Starred (*) fields are required.
        </div>
        </>
    );
};

export default AddData;