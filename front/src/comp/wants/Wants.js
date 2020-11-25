import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const Wants = ({type}) => {
    const [show, setShow] = useState(false);
    const [wants, setWants] = useState([]);
    const [myWants, setMyWants] = useState([]);
    const [searchPara, setSearchPara] = useState( {"filtered": ""} );
    const [filWants, setFilterWants] = useState([]);
    const [filMyWants, setFilterMyWants] = useState([]);

    let searchWants = searchPara.filtered.length > 0 ? filWants : wants;
    let searchMyWants = searchPara.filtered.length > 0 ? filMyWants : myWants;

    const mywantshook = () => {
        let myTempWants = wants.filter(n => n.want === 1);
        setMyWants(myTempWants);
    };
    useEffect(mywantshook, [wants]);

    const changeEngine = (e, id, value) => {
        e.stopPropagation();
        let tempPokemon = wants.find(p => p.pid === id);
        tempPokemon = { ...tempPokemon, want: value };
        apiService.changeWant(id, tempPokemon, type)
        .then(res => {
            const tempPokemons = wants.map(p => {
                if (p.pid === id) { p = tempPokemon; if(p.want === true) { p.want = 1;}; };
                return p;
            });
            setWants(tempPokemons);
            if(tempPokemon.want === true){ setMyWants(tempPokemon) };
            if(tempPokemon.name.startsWith(searchPara.filtered)){
                const tempFiltered = wants.map(p => {
                    if (p.pid === id) { p = tempPokemon; if(p.want === true) { p.want = 1;}; };
                    return p;
                }).filter(p => String(p.name).startsWith(searchPara.filtered));
                setFilterWants(tempFiltered);
                let tempWantFilt = tempFiltered.filter(p => p.want === 1);
                setFilterMyWants(tempWantFilt);
            };
        }).catch(err => { window.alert('Something went wrong :(') });
    };

    const searchFilter = (value, fieldname) => {
        const tempSearch = { ...searchPara };
        tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
        setSearchPara(tempSearch);
    };

    const mySearchHook = () => {
        let myTSearch = wants.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilterWants(myTSearch);
        let myTWSearch = myWants.filter(p => String(p.name).startsWith(searchPara.filtered));
        setFilterMyWants(myTWSearch);
    };
    useEffect(mySearchHook, [searchPara]);

    return (
        <>
        <GetWantsHook setList={setWants} type={type} />
        <br />
        <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
        <br /><br />
        <button onClick={e => setShow(!show)}>{show ? "Show all" : "Show only wanted"}</button>
        <div className="container">
            {show ? <WantLister wants={searchMyWants} changeEngine={changeEngine} type={type} /> : <WantLister wants={searchWants} changeEngine={changeEngine} type={type} />}
        </div>
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

export default Wants;