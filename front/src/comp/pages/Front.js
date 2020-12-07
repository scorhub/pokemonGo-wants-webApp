import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import FrontHook from '../hooks/FrontHook';

const TextBox = ({text}) => {
    const [hidden, setHidden] = useState(false);
    let longText = null;
    let shortText = null;
    if(text.nid !== undefined){ longText = text.ntext; } else { longText = text.etext; };
    if(longText !== null && longText.length > 500){ shortText = longText.slice(0, 500); };
    const textShortener = () => {
        if(longText !== null && longText.length > 500 && hidden === false){ setHidden(true); };
    };
    useEffect(textShortener, [text]);
    if(text.nid !== undefined){
        return (
        <div className="textbox">
            <h3>{text.ntitle}</h3>
            {hidden ?
            <>
            <div dangerouslySetInnerHTML={{ __html: shortText }} />
            <button onClick={e => setHidden(false)} >Show more</button>
            </>
            :
            <>
            <div dangerouslySetInnerHTML={{ __html: longText }} />
            {shortText !== null && <><button onClick={e => setHidden(true)} >Show less</button></>}
            </>
            }
            <br/><br/>
        <i>{text.showname}&nbsp;|&nbsp;{new Date(text.published).toLocaleDateString()}{text.nedited !== null && <>&nbsp;|&nbsp;Last&nbsp;edited&nbsp;{new Date(text.nedited).toLocaleDateString()}</>}</i>
        </div>
        );
    } else {
        let startdate = new Date(text.estart).toLocaleDateString();
        let enddate = new Date(text.eend).toLocaleDateString();
        let startime = new Date(text.estart).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");
        let endtime = new Date(text.eend).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}).replace(/(:\d{2}| [AP]M)$/, "");

        return (
        <div className="textbox">
            <h3>{text.ename}&nbsp;&nbsp;&nbsp;{text.elink !== null && <a href={text.elink} target="blank" ><i className="fa fa-external-link" aria-hidden="true"/>{null}</a>}</h3>
            <h4>{startdate}&nbsp;{startime}&nbsp;-{enddate !== startdate && <>&nbsp;{enddate}</>}&nbsp;{endtime}</h4>
            {hidden ?
            <>
            <div dangerouslySetInnerHTML={{ __html: shortText }} />
            <button onClick={e => setHidden(false)} >Show more</button><br/>
            </>
            :
            <>
            <div dangerouslySetInnerHTML={{ __html: longText }} />
            {shortText !== null && <><button onClick={e => setHidden(true)} >Show less</button><br/></>}
            </>
            }
            <br/>
            <i>Published&nbsp;{new Date(text.published).toLocaleDateString()}</i>
        </div>
        );
    };
};

const Front = () => {
    const [frontList, setFrontList] = useState([]);
    return (
    <>
    <FrontHook setList={setFrontList} />
    
    {frontList.sort(function(a,b){ return new Date(b.published) - new Date(a.published); }).map(text => <TextBox key={text.fid} text={text} /> )}
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
    );
};

export default Front;