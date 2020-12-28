import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { GetArchivedHook } from '../../hooks/AdminHooks';
import adminservice from '../../../serv/adminservice';
import NewsEditWindow from './NewsEditWindow';
import NewsEditButton from './NewsEditButton';

const NewsBox = ({news, setEditPost, editPost, setShow}) => {
    return (
        <div className="textbox">
            <NewsEditButton news={news} setEditPost={setEditPost} editPost={editPost} setShow={setShow} type={"archived"} />
            <h3>{news.ntitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: news.ntext }} />
            <br/>
            <i>{news.showname}&nbsp;|&nbsp;{new Date(news.ndate).toLocaleDateString()}{news.nedited !== null && <>&nbsp;|&nbsp;Last&nbsp;edited&nbsp;{new Date(news.nedited).toLocaleDateString()}</>}</i>
        </div>
    );
};

const ArchivedNews = () => {
    const [archived, setArchived] = useState([]);
    const [show, setShow] = useState(false);
    const [editPost, setEditPost] = useState({"nid": "", "ntitle": "", "ntext": ""});

    const updEngine = () => {
        adminservice.patchNews(editPost.nid, {"ntitle": editPost.ntitle, "ntext": editPost.ntext})
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };
    
    return (
    <>
    <GetArchivedHook setList={setArchived} />
    <div className="editwrapdiv">
    {show && <NewsEditWindow updEngine={updEngine} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> }
    </div>
    <h4>Archived news.</h4>
    {archived.map(news => <NewsBox key={news.nid} news={news} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default ArchivedNews;