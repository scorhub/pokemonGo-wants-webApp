import React from 'react';
import adminservice from '../../../serv/adminservice';

const NewsEditButton = ({news, setEditPost, setShow, type}) => {
    const archivePost = (e) => {
        e.preventDefault();
        if(type === "visible"){
            if(window.confirm("Are you sure you want the post to be archived?")){
            adminservice.patchNews(news.nid, {"narchived": 1})
            .then(res => { window.location.reload() })
            .catch(e => { alert('Something went wrong.') });
            };
        } else if (type === "archived"){
            if(window.confirm("Are you sure you want the post to be set visible?")){
            adminservice.patchNews(news.nid, {"narchived": 0})
            .then(res => { window.location.reload() })
            .catch(e => { alert('Something went wrong.') });
            };
        } else {
            window.alert("Something went wrong :(");
        };
    };

    const openEdit = (e) => {
        e.preventDefault();
        setEditPost({"nid": news.nid, "ntitle": news.ntitle, "ntext": news.ntext});
        setShow(true);
    };

    return (
        <div className="editbutton" >
            <button onClick={e=> archivePost(e) } >{type === "visible" ? "ARCHIVE" : "SET VISIBLE"}</button>
            <button onClick={e=> openEdit(e) } >EDIT</button>
        </div>
    );
};

export default NewsEditButton;