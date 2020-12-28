import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const ShinyWants = ({type})  => {
  const [show, setShow] = useState(false);
  const [shinyWants, setShinyWants] = useState([]);
  const [myShinyWants, setMyShinyWants] = useState([]);
  const [searchPara, setSearchPara] = useState( {"filtered": ""} );
  const [filShiny, setFilShiny] = useState([]);
  const [filWantShiny, setFilWantShiny] = useState([]);

  let searchCostume = searchPara.filtered.length > 0 ? filShiny : shinyWants;
  let searchCosWants = searchPara.filtered.length > 0 ? filWantShiny : myShinyWants;

  const mycostumehook = () => {
    let myTempWants = shinyWants.filter(p => p.swant === 1);
    setMyShinyWants(myTempWants);
  };
  useEffect(mycostumehook, [shinyWants]);

  const changeEngine = (e, id, value) => {
    e.stopPropagation();
    let tempPokemon = shinyWants.find(p => p.sid === id);
    tempPokemon = { ...tempPokemon, swant: value };
    apiService.changeWant(id, {swant: value}, type)
    .then(res => {
        const tempPokemons = shinyWants.map(p => {
            if (p.sid === id) { p = tempPokemon; if(p.swant === true) { p.swant = 1;}; };
            return p;
        });
        setShinyWants(tempPokemons);
        if(tempPokemon.swant === true){ setMyShinyWants(tempPokemon) };
        if(tempPokemon.name.startsWith(searchPara.filtered)){
            const tempFiltered = shinyWants.map(p => {
                if (p.sid === id) { p = tempPokemon; if(p.swant === true) { p.swant = 1;}; };
                return p;
            }).filter(p => String(p.name).startsWith(searchPara.filtered));
            setFilShiny(tempFiltered);
            let tempWantFilt = tempFiltered.filter(p => p.swant === 1);
            setFilWantShiny(tempWantFilt);
        };
    }).catch(err => { window.alert("Database error, please try again later.")});
};

  const searchFilter = (value, fieldname) => {
    const tempSearch = { ...searchPara };
    tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
    setSearchPara(tempSearch);
  };

  const mySearchHook = () => {
    let myTSearch = shinyWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilShiny(myTSearch);
    let myTWSearch = myShinyWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilWantShiny(myTWSearch);
  };
  useEffect(mySearchHook, [searchPara]);

  return (
    <>
    <GetWantsHook setList={setShinyWants} type={type} />
    <br/>
    <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
    <br/><br/>
    <button onClick={e => setShow(!show)}>{show ? "Show all" : "Show only wanted"}</button>
    <div className="container">
        {show ? <WantLister wants={searchCosWants} changeEngine={changeEngine} type={type} /> : <WantLister wants={searchCostume} changeEngine={changeEngine} type={type} />}
    </div>
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
  );
};

export default ShinyWants;