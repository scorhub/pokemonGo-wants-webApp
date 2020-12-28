import React, { useState } from 'react';
import adminservice from '../../../serv/adminservice';

const AddCostume = () => {
    const [newCostume, setNewCostume] = useState({ "number": "", "version": "", "img": "", "cfirstappearance": "" });

    const addNewCostume = (e) => {
        e.preventDefault();
        const type = "costume";
        adminservice.addPokemon(newCostume, type)
        .then(res => {
            setNewCostume({ "number": "", "version": "" , "img": "", "cfirstappearance": "" });
            window.alert('Costume added.')
        }).catch(e => { alert('Something went wrong.') });
    };

    const setRegField = (value, fieldname) => {
        const tempData = { ...newCostume };
        tempData[fieldname] = value;
        setNewCostume(tempData);
    };

    return (
        <>
        <div className="item">
            <h4>Add new Costume.</h4>
            <form onSubmit={e => { addNewCostume(e) }}>
                <h5 className="formtitle">Pokédex entry number *</h5>
                <input type="number" onChange={e => setRegField(e.target.value, "number")} required value={newCostume.number} />
                <h5 className="formtitle">Version name *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "version")} required value={newCostume.version} />
                <h5 className="formtitle">First appearance *</h5>
                <input type="date" onChange={e => setRegField(e.target.value, "cfirstappearance")} required value={newCostume.cfirstappearance} />
                <h5 className="formtitle">Image link *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "img")} required value={newCostume.img} />
                <div className="button">
                    <br/>
                    <button type="submit">Add Costume</button>
                </div>
            </form>
            <br/>
            Starred (*) fields are required.
        </div>
        </>
    );
};

export default AddCostume;