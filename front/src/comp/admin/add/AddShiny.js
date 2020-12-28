import React, { useState } from 'react';
import adminservice from '../../../serv/adminservice';

const AddShiny = () => {
    const [newShiny, setNewShiny] = useState({ "number": "", "shinyimg": ""});

    const addnewShiny = (e) => {
        e.preventDefault();
        if(newShiny.img.startsWith('http')){
            const type = "shiny";
            adminservice.addPokemon(newShiny, type)
            .then(res => {
                setNewShiny({ "number": "", "shinyimg": ""});
                window.alert('Shiny added.')
            }).catch(e => { alert('Something went wrong.') });
        } else { window.alert('Image must be in url form.'); };
    };

    const setRegField = (value, fieldname) => {
        const tempData = { ...newShiny };
        tempData[fieldname] = value;
        setNewShiny(tempData);
    };

    return (
        <>
        <div className="item">
            <h4>Add new shiny.</h4>
            <form onSubmit={e => { addnewShiny(e) }}>
                <h5 className="formtitle">Pokédex entry number *</h5>
                <input type="number" onChange={e => setRegField(e.target.value, "number")} required value={newShiny.number} />
                <h5 className="formtitle">Image link *</h5>
                <input type="text" onChange={e => setRegField(e.target.value, "shinyimg")} required value={newShiny.shinyimg} />
                <div className="button">
                    <br/>
                    <button type="submit">Add shiny</button>
                </div>
            </form>
            <br/>
            Starred (*) fields are required.
        </div>
        </>
    );
};

export default AddShiny;