import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const AreanWants = ({type})  => {
  const [show, setShow] = useState(false);
  const [areanWants, setAreanWants] = useState([]);
  const [myAreanWants, setMyAreanWants] = useState([]);
  const [searchPara, setSearchPara] = useState( {"filtered": ""} );
  const [filArean, setFilArean] = useState([]);
  const [filWantArean, setFilWantArean] = useState([]);

  let searchArean = searchPara.filtered.length > 0 ? filArean : areanWants;
  let searchArWants = searchPara.filtered.length > 0 ? filWantArean : myAreanWants;

  const myareanhook = () => {
    let myTempWants = areanWants.filter(p => p.arwant === 1);
    setMyAreanWants(myTempWants);
  };
  useEffect(myareanhook, [areanWants]);

  const changeEngine = (e, id, value) => {
    e.stopPropagation();
    let tempPokemon = areanWants.find(p => p.aid === id);
    tempPokemon = { ...tempPokemon, arwant: value };
    apiService.changeWant(id, {arwant: value}, type)
    .then(res => {
        const tempPokemons = areanWants.map(p => {
            if (p.aid === id) { p = tempPokemon; if(p.arwant === true) { p.arwant = 1;}; };
            return p;
        });
        setAreanWants(tempPokemons);
        if(tempPokemon.arwant === true){ setMyAreanWants(tempPokemon) };
        if(tempPokemon.name.startsWith(searchPara.filtered)){
            const tempFiltered = areanWants.map(p => {
                if (p.aid === id) { p = tempPokemon; if(p.arwant === true) { p.arwant = 1;}; };
                return p;
            }).filter(p => String(p.name).startsWith(searchPara.filtered));
            setFilArean(tempFiltered);
            let tempWantFilt = tempFiltered.filter(p => p.arwant === 1);
            setFilWantArean(tempWantFilt);
        };
    }).catch(err => { window.alert("Database error, please try again later.")});
};

  const searchFilter = (value, fieldname) => {
    const tempSearch = { ...searchPara };
    tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
    setSearchPara(tempSearch);
  };

  const mySearchHook = () => {
    let myTSearch = areanWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilArean(myTSearch);
    let myTWSearch = myAreanWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilWantArean(myTWSearch);
  };
  useEffect(mySearchHook, [searchPara]);

  return (
    <>
    <GetWantsHook setList={setAreanWants} type={type} />
    <br />
    <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
    <br /><br />
    <button onClick={e => setShow(!show)}>{show ? "Show all" : "Show only wanted"}</button>
    <div className="container">
        {show ? <WantLister wants={searchArWants} changeEngine={changeEngine} type={type} /> : <WantLister wants={searchArean} changeEngine={changeEngine} type={type} />}
    </div>
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
  );
};

export default AreanWants;