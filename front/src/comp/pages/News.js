import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { NewsHook } from '../hooks/CommonHooks';
import apiService from '../../serv/apiservice';

const EditWindow = ({updEngine, editPost, setEditPost, setShow, id}) => {
    
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

const EditButton = ({news, setEditPost, setShow}) => {
    const archivePost = (e) => {
        e.preventDefault();
        if(window.confirm("Are you sure you want the post to be archived?")){
        apiService.patchNews(news.nid, {"narchived": 1})
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
        };
    };

    const openEdit = (e) => {
        e.preventDefault();
        setEditPost({"nid": news.nid, "ntitle": news.ntitle, "ntext": news.ntext});
        setShow(true);
    };

    return (
        <div className="editbutton" >
            <button onClick={e=> archivePost(e) } >ARCHIVE</button>
            <button onClick={e=> openEdit(e) } >EDIT</button>
        </div>
    );
};

const NewsBox = ({news, ucid, setEditPost, editPost, setShow}) => {
    return (
        <div className="textbox">
            {ucid === 1 && <EditButton news={news} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> }
            <h3>{news.ntitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: news.ntext }} />
            <br/>
            <i>{news.showname}&nbsp;|&nbsp;{new Date(news.ndate).toLocaleDateString()}{news.nedited !== null && <>&nbsp;|&nbsp;Last&nbsp;edited&nbsp;{new Date(news.nedited).toLocaleDateString()}</>}</i>
        </div>
    );
};

const News = () => {
    const [newsList, setNewsList] = useState([]);
    const [show, setShow] = useState(false);
    const [editPost, setEditPost] = useState({"nid": "", "ntitle": "", "ntext": ""});
    const ucid = JSON.parse(window.localStorage.getItem('loggedWantAppUser')).ucid;

    const updEngine = () => {
        apiService.patchNews(editPost.nid, {"ntitle": editPost.ntitle, "ntext": editPost.ntext})
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };

    return (
    <>
    <NewsHook setList={setNewsList} />
    <div className="editwrapdiv">
    {show && <EditWindow updEngine={updEngine} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> }
    </div>
    {newsList.map(news => <NewsBox key={news.nid} news={news} ucid={ucid} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default News;