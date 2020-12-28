import React, { useState } from 'react';
import adminservice from '../../../serv/adminservice';

const AddArean = () => {
    const [newArean, setNewArean] = useState({ "number": "", "img": "" });

    const addnewArean = (e) => {
        e.preventDefault();
        if(newArean.img.startsWith('http')){
            const type = "arean";
            adminservice.addPokemon(newArean, type)
            .then(res => {
                setNewArean({ "number": "", "img": "" });
                window.alert('Arean variant added.')
            }).catch(e => { alert('Something went wrong.') });
        } else { window.alert('Image must be in url form!'); };
    };

    const setRegField = (value, fieldname) => {
        const tempData = { ...newArean };
        tempData[fieldname] = value;
        setNewArean(tempData);
    };

    return (
        <>
        <div className="item">
            <h4>Add new arean variant.</h4>
            <form onSubmit={e => { addnewArean(e) }}>
                <h5 className="formtitle">Pokédex entry number *</h5>
                <input type="number" onChange={e => setRegField(e.target.value, "number")} required value={newArean.number} />
                <h5 className="formtitle">Image link *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "img")} required value={newArean.img} />
                <div className="button">
                    <br/>
                    <button type="submit">Add arean variant</button>
                </div>
            </form>
            <br/>
            Starred (*) fields are required.
        </div>
        </>
    );
};

export default AddArean;