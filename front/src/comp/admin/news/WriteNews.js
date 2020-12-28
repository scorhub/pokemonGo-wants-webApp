import React, { useState } from 'react';
import adminservice from '../../../serv/adminservice';

const WriteNews = () => {
    const [newNews, setNewNews] = useState({"ntitle": "", "ntext": ""});

    const addNews = (e) => {
        e.preventDefault();
        adminservice.postNews(newNews)
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };
    
    const setRegField = (value, fieldname) => {
        const tempData = { ...newNews };
        tempData[fieldname] = value;
        setNewNews(tempData);
    };
    return (
    <div className="item">
        <h4>Write news.</h4>
        <form onSubmit={e => { addNews(e) }}>
            <h5 className="formtitle">Title</h5>
            <input type="text" onChange={e => setRegField(e.target.value, "ntitle")} autoFocus="autofocus" required value={newNews.ntitle} />
            <h5 className="formtitle">Text</h5>
            <textarea rows="8" cols="50" onChange={e => setRegField(e.target.value, "ntext")} required value={newNews.ntext} />
            <div className="button">
                <br/>
                <button type="submit">Send</button>
            </div>
        </form>
        <br/>
        Starred (*) fields are required.
    </div>
    );
};

export default WriteNews;