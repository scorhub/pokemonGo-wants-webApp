import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { GetOtherWants } from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const OneWants = ({users}) => {
    const { uid } = useParams();
    const thisUser = users.filter(u => Number(u.uid) === Number(uid))[0];
    const [otherWants, setOtherWants] = useState([]);
    const [otherAlWants, setOtherAlWants] = useState([]);
    const [otherAreanWants, setOtherAreanWants] = useState([]);
    const [searchPara, setSearchPara] = useState( {"filtered": ""} );
    const [filOWants, setFilOWants] = useState([]);
    const [filOAlWants, setFilOAlWants] = useState([]);
    const [filOArWants, setFilOArWants] = useState([]);

    let sOWants = searchPara.filtered.length > 0 ? filOWants : otherWants;
    let sOAlWants = searchPara.filtered.length > 0 ? filOAlWants : otherAlWants;
    let sOArWants = searchPara.filtered.length > 0 ? filOArWants : otherAreanWants;

    const searchFilter = (value, fieldname) => {
        const tempSearch = { ...searchPara };
        tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
        setSearchPara(tempSearch);
    };

    const mySearchHook = () => {
      let myTSearch = otherWants.filter(p => String(p.name).startsWith(searchPara.filtered));
      setFilOWants(myTSearch);
      let myTWSearch = otherAlWants.filter(p => String(p.name).startsWith(searchPara.filtered));
      setFilOAlWants(myTWSearch);
      let myTWASearch = otherAreanWants.filter(p => String(p.name).startsWith(searchPara.filtered));
      setFilOArWants(myTWASearch);
    };
    useEffect(mySearchHook, [searchPara]);
    
    return (
        <>
        <h2 className="centerme">{thisUser !== undefined && thisUser.showname}</h2>
        <GetOtherWants setList={setOtherWants} id={uid} type={"lucky"} />
        <GetOtherWants setList={setOtherAlWants} id={uid} type={"always"} />
        <GetOtherWants setList={setOtherAreanWants} id={uid} type={"arean"} />
        <br />
        <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
        <br /><br />
        {otherAlWants.length > 0 && <><h3 className="centerme">Kelpaa aina</h3><div className="container"><WantLister wants={sOAlWants} type={"always"} /></div></>}
        {otherAreanWants.length > 0 && <><h3 className="centerme">Arean</h3><div className="container"><WantLister wants={sOArWants} type={"arean"} /></div></>}
        {otherWants.length > 0 && <><h3 className="centerme">Lucky Hunt</h3><div className="container"><WantLister wants={sOWants} type={"lucky"} /></div></>}
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

const OtherWants = ({users}) => {
    let match = useRouteMatch();
    const locale = JSON.parse(window.localStorage.getItem('loggedWantAppUser')).name;
    return (
        <div className="userboxes">
            <ul>
                {/* Following if-sentence is for "testuserABC" is used to show the functionality of an app to potential recruiters, without for that account to see other users except id 1 (creator) and not to be shown on wanted listing for other users of the app. */}
            {locale === "testuserABC" ? users.filter(u => u.uid === 1).map(u => <li key={u.uid}><NavLink to={`${match.url}/${u.uid}`} activeClassName="active" value={u.uid}>{u.showname}</NavLink></li>) : users.filter(u => u.showname !== "testuserABC").map(u => <li key={u.uid}><NavLink to={`${match.url}/${u.uid}`} activeClassName="active" value={u.uid}>{u.showname}</NavLink></li>)}
            </ul>
        </div>
    );
};

export default OtherWants;
export { OneWants };