import React, { useState } from 'react';
import adminservice from '../../../serv/adminservice';
import { GetCountHook } from '../../hooks/AdminHooks';

const AddPokemon = () => {
    const [count, setCount] = useState([]);
    const [newData, setNewData] = useState({ "number": "", "name": "" });
    const biggestid = count +1;

    const addNewData = (e) => {
        e.preventDefault();
        const type = "normal";
        adminservice.addPokemon(newData, type)
        .then(res => { })
        .catch(e => { alert('Something went wrong.') });
    };

    const setDataField = (value, fieldname) => {
        const tempData = { ...newData };
        tempData[fieldname] = value;
        setNewData(tempData);
    };

    return (
        <>
        <GetCountHook setList={setCount} />
        <div className="item">
            <h4>Add new Pokémon.</h4>
            <p>Number of next Pokémon: {biggestid}</p>
            <form onSubmit={e => { addNewData(e) }}>
                {/* <h5 className="formtitle">Pokédex entry number *</h5>
                <input type="number" onChange={e => setDataField(e.target.value, "number")} required value={newData.number} /> */}
                {/* App automatically counts entry numbers from one to up, handy when building database from ground. For later add-ons (like Meltan or other Pokémons that are added game in random order, rather than in numerical), selecting entry number manually is required. */}
                <h5 className="formtitle">Name *</h5>
                <input type="text" onChange={e => setDataField(e.target.value, "name")} autoFocus="autofocus" required value={newData.name} />
                <div className="button">
                    <br/>
                    <button type="submit">Add Pokémon</button>
                </div>
            </form>
            <br/>
            Starred (*) fields are required.
        </div>
        </>
    );
};

export default AddPokemon;