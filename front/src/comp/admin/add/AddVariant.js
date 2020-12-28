import React, { useState } from 'react';
import adminservice from '../../../serv/adminservice';

const AddVariant = () => {
    const [newVariant, setNewVariant] = useState({ "number": "", "version": "", "img": "" });

    const addNewVariant = (e) => {
        e.preventDefault();
        const type = "variant";
        adminservice.addPokemon(newVariant, type)
        .then(res => {
            setNewVariant({ "number": "", "version": "" , "img": "" });
            window.alert('Variant added.')
        }).catch(e => { alert('Something went wrong.') });
    };

    const setRegField = (value, fieldname) => {
        const tempData = { ...newVariant };
        tempData[fieldname] = value;
        setNewVariant(tempData);
    };

    return (
        <>
        <div className="item">
            <h4>Add new Variant.</h4>
            <form onSubmit={e => { addNewVariant(e) }}>
                <h5 className="formtitle">Pokédex entry number *</h5>
                <input type="number" onChange={e => setRegField(e.target.value, "number")} required value={newVariant.number} />
                <h5 className="formtitle">Version name *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "version")} required value={newVariant.version} />
                <h5 className="formtitle">Image link *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "img")} required value={newVariant.img} />
                <div className="button">
                    <br/>
                    <button type="submit">Add Variant</button>
                </div>
            </form>
            <br/>
            Starred (*) fields are required.
        </div>
        </>
    );
};

export default AddVariant;