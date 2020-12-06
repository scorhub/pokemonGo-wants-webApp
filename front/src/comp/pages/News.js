import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import NewsHook from '../hooks/NewsHook';

const NewsBox = ({news}) => {
    return (
        <div className="textbox">
            <h3>{news.ntitle}</h3>
            <div dangerouslySetInnerHTML={{ __html: news.ntext }} />
            <br/>
            <i>{news.showname}&nbsp;|&nbsp;{new Date(news.ndate).toLocaleDateString()}</i>
        </div>
    );
};

const News = () => {
    const [newsList, setNewsList] = useState([]);
    return (
    <>
    <NewsHook setList={setNewsList} />
    
    {newsList.map(news => <NewsBox key={news.nid} news={news} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default News;