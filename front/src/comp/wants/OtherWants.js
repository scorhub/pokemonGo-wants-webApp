import React, { useState, useEffect } from 'react';
import { Switch, Route, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { GetOtherWants } from '../hooks/GetWantsHook';
import WantsWindow from '../wants/WantsWindow';
import WantLister from '../wants/WantLister';

const OneWants = ({uid}) => {
    const [otherWants, setOtherWants] = useState([]);
    const [otherAlWants, setOtherAlWants] = useState([]);
    const [otherAreanWants, setOtherAreanWants] = useState([]);
    const [otherVariantWants, setOtherVariantWants] = useState([]);
    const [searchPara, setSearchPara] = useState( {"filtered": ""} );
    const [genFilter, setGenFilter] = useState(0);
    const [genOWants, setGenOWants] = useState([]);
    const [genOAlWants, settGenOAlWants] = useState([]);
    const [genOArWants, settGenOArWants] = useState([]);
    const [genOVWants, settGenOVWants] = useState([]);
    const [filOWants, setFilOWants] = useState([]);
    const [filOAlWants, setFilOAlWants] = useState([]);
    const [filOArWants, setFilOArWants] = useState([]);
    const [filOVWants, setFilOVWants] = useState([]);

    // sOWants stands for searchedOtherWants, sOAlWants for searchedOtherAlwaysWants and sOArWants for searchedOtherAreanWants
    let sOWants = searchPara.filtered.length > 0 ? filOWants : genOWants;
    let sOAlWants = searchPara.filtered.length > 0 ? filOAlWants : genOAlWants;
    let sOArWants = searchPara.filtered.length > 0 ? filOArWants : genOArWants;
    let sOVWants = searchPara.filtered.length > 0 ? filOVWants : genOVWants;

    // let finalOWants = genFilter === 0 ? sOWants : sOWants.filter(p => Number(p.generation) === Number(genFilter));
    // let finalOAlWants = genFilter === 0 ? sOAlWants : sOAlWants.filter(p => Number(p.generation) === Number(genFilter));
    // let finalOArWants = genFilter === 0 ? sOArWants : sOArWants.filter(p => Number(p.generation) === Number(genFilter));

    const searchFilter = (value, fieldname) => {
        const tempSearch = { ...searchPara };
        tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
        setSearchPara(tempSearch);
    };

    const genSearchHook = () => {
        let genWantFtr = genFilter > 0 ? otherWants.filter(p => Number(p.generation) === Number(genFilter)) : otherWants;
        setGenOWants(genWantFtr);
        let genAlWantFtr = genFilter > 0 ? otherAlWants.filter(p => Number(p.generation) === Number(genFilter)) : otherAlWants;
        settGenOAlWants(genAlWantFtr);
        let genArWantFtr = genFilter > 0 ? otherAreanWants.filter(p => Number(p.generation) === Number(genFilter)) : otherAreanWants;
        settGenOArWants(genArWantFtr);
        let genCWantFtr = genFilter > 0 ? otherVariantWants.filter(p => Number(p.generation) === Number(genFilter)) : otherVariantWants;
        settGenOVWants(genCWantFtr);
    };
    useEffect(genSearchHook, [searchPara, genFilter, otherWants, otherAlWants, otherAreanWants, otherVariantWants]);

    const mySearchHook = () => {
        let myTSearch = otherWants.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilOWants(myTSearch);
        let myTWSearch = otherAlWants.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilOAlWants(myTWSearch);
        let myTWASearch = otherAreanWants.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilOArWants(myTWASearch);
        let myTWCSearch = otherVariantWants.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilOVWants(myTWCSearch);
    };
    useEffect(mySearchHook, [searchPara, genFilter]);

    return (
        <>
        <GetOtherWants setList={setOtherWants} id={uid} type={"lucky"} />
        <GetOtherWants setList={setOtherAlWants} id={uid} type={"always"} />
        <GetOtherWants setList={setOtherAreanWants} id={uid} type={"arean"} />
        <GetOtherWants setList={setOtherVariantWants} id={uid} type={"variant"} />
        <br/>
        <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>&nbsp;&nbsp;&nbsp;
        <select onChange={(e) => setGenFilter(e.target.value)}>
            <option value={0}>Choose generation</option>
            <option value={1}>Gen 1</option>
            <option value={2}>Gen 2</option>
            <option value={3}>Gen 3</option>
            <option value={4}>Gen 4</option>
            <option value={5}>Gen 5</option>
            <option value={6}>Gen 6</option>
            <option value={7}>Gen 7</option>
            <option value={8}>Gen 8</option>
        </select>
        <br/><br/>
        <WantsWindow always={sOAlWants} arean={sOArWants} variant={sOVWants} lucky={sOWants} />
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

const OneShinyWants = ({uid}) => {
    const [otherShiny, setOtherShiny] = useState([]);
    const [searchPara, setSearchPara] = useState( {"filtered": ""} );
    const [filSWants, setFilSWants] = useState([]);

    let ShinyWants = searchPara.filtered.length > 0 ? filSWants : otherShiny;

    const searchFilter = (value, fieldname) => {
        const tempSearch = { ...searchPara };
        tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
        setSearchPara(tempSearch);
    };

    const mySearchHook = () => {
        let myTSearch = otherShiny.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilSWants(myTSearch);
    };
    useEffect(mySearchHook, [searchPara]);
    return (
        <>
        <GetOtherWants setList={setOtherShiny} id={uid} type="shiny" />
        <br/>
        <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>&nbsp;&nbsp;&nbsp;
        <br/><br/>
        <h2 className="centered">Shiny Wants</h2>
        {otherShiny !== null && otherShiny !== undefined && otherShiny.length > 0 && <><div className="container"><WantLister wants={ShinyWants} type={"shiny"} /></div></>}
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

const OneCostumeWants = ({uid}) => {
    const [otherCostumeWants, setOtherCostumeWants] = useState([]);
    return (
        <>
        <GetOtherWants setList={setOtherCostumeWants} id={uid} type="costume" />
        <h2 className="centered">Costume Wants</h2>
        {otherCostumeWants !== null && otherCostumeWants !== undefined && otherCostumeWants.length > 0 && <><div className="container"><WantLister wants={otherCostumeWants} type={"costume"} /></div></>}
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

const OneWantsRouter = ({users}) => {
    const { uid } = useParams();
    let match = useRouteMatch();
    const thisUser = users.filter(u => Number(u.uid) === Number(uid))[0];
    return (
        <>
        <div className="printlinks">
            <ul>
                <li className="nobackli"><NavLink to={`#`} activeClassName="namebylink">{thisUser !== undefined && thisUser.showname}</NavLink></li>
                <li><NavLink to={`${match.url}`} activeClassName="active">Wants</NavLink></li>
                <li><NavLink to={`${match.url}/shiny`} activeClassName="active">Shiny Wants</NavLink></li>
                <li><NavLink to={`${match.url}/costume`} activeClassName="active">Costume Wants</NavLink></li>
            </ul>
        </div>
        <Switch>
            <Route exact path={`${match.path}/`} render={(props) => <OneWants {...props} uid={uid} users={users} />} />
            <Route exact path={`${match.url}/shiny`} render={(props) => <OneShinyWants {...props} uid={uid} />} />
            <Route exact path={`${match.url}/costume`} render={(props) => <OneCostumeWants {...props} uid={uid} />} />
        </Switch>
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
export { OneWantsRouter };