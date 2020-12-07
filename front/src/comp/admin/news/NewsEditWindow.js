import React from 'react';

const NewsEditWindow = ({updEngine, editPost, setEditPost, setShow}) => {
    
    const setRegField = (value, fieldname) => {
        const tempData = { ...editPost };
        tempData[fieldname] = value;
        setEditPost(tempData);
    };

    return (
        <div className="editwindow">
            <h4>Edit post.</h4>
            <button className="editclosebutton" onClick={e=>setShow(false)}>Close</button>
            <form onSubmit={e => { updEngine() }}>
                <h5 className="formtitle">Title</h5>
                <input type="text" size="50" onChange={e => setRegField(e.target.value, "ntitle")} autoFocus="autofocus" required value={editPost.ntitle} />
                <h5 className="formtitle">Text</h5>
                <textarea rows="15" cols="75" onChange={e => setRegField(e.target.value, "ntext")} required value={editPost.ntext} />
                <div className="button">
                    <br />
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

export default NewsEditWindow;