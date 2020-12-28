import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { NewsHook } from '../hooks/CommonHooks';
import adminservice from '../../serv/adminservice';
import NewsEditButton from '../admin/news/NewsEditButton';
import NewsEditWindow from '../admin/news/NewsEditWindow';

const NewsBox = ({news, ucid, setEditPost, editPost, setShow}) => {
    return (
        <div className="textbox">
            {ucid === 1 && <NewsEditButton news={news} setEditPost={setEditPost} editPost={editPost} setShow={setShow} type={"visible"} /> }
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
        adminservice.patchNews(editPost.nid, {"ntitle": editPost.ntitle, "ntext": editPost.ntext})
        .then(res => { window.location.reload() })
        .catch(e => { alert('Something went wrong.') });
    };

    return (
    <>
    <NewsHook setList={setNewsList} />
    <div className="editwrapdiv">
    {show && <NewsEditWindow updEngine={updEngine} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> }
    </div>
    {newsList.map(news => <NewsBox key={news.nid} news={news} ucid={ucid} setEditPost={setEditPost} editPost={editPost} setShow={setShow} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default News;