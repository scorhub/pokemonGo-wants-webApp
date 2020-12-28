import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const VariantWants = ({type})  => {
  const [show, setShow] = useState(false);
  const [variantWants, setVariantWants] = useState([]);
  const [myVariantWants, setMyVariantWants] = useState([]);
  const [searchPara, setSearchPara] = useState( {"filtered": ""} );
  const [filtered, setFiltered] = useState([]);
  const [filteredWant, setFilteredWant] = useState([]);

  let searchVar = searchPara.filtered.length > 0 ? filtered : variantWants;
  let searchVarWants = searchPara.filtered.length > 0 ? filteredWant : myVariantWants;

  const myvarianthook = () => {
    if(variantWants !== null){
    let myTempWants = variantWants.filter(p => p.vwant === 1);
    setMyVariantWants(myTempWants);
    };
  };
  useEffect(myvarianthook, [variantWants]);

  const changeEngine = (e, id, value) => {
    e.stopPropagation();
    let tempPokemon = variantWants.find(p => p.vid === id);
    tempPokemon = { ...tempPokemon, vwant: value };
    apiService.changeWant(id, {vwant: value}, type)
    .then(res => {
        const tempPokemons = variantWants.map(p => {
            if (p.vid === id) { p = tempPokemon; if(p.vwant === true) { p.vwant = 1;}; };
            return p;
        });
        setVariantWants(tempPokemons);
        if(tempPokemon.vwant === true){ setMyVariantWants(tempPokemon) };
        if(tempPokemon.name.startsWith(searchPara.filtered)){
            const tempFiltered = variantWants.map(p => {
                if (p.vid === id) { p = tempPokemon; if(p.vwant === true) { p.vwant = 1;}; };
                return p;
            }).filter(p => String(p.name).startsWith(searchPara.filtered));
            setFiltered(tempFiltered);
            let tempWantFilt = tempFiltered.filter(p => p.vwant === 1);
            setFilteredWant(tempWantFilt);
        };
    }).catch(err => { window.alert("Database error, please try again later.")});
};

  const searchFilter = (value, fieldname) => {
    const tempSearch = { ...searchPara };
    tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
    setSearchPara(tempSearch);
  };

  const mySearchHook = () => {
    let myTSearch = variantWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFiltered(myTSearch);
    let myTWSearch = myVariantWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilteredWant(myTWSearch);
  };
  useEffect(mySearchHook, [searchPara]);

  return (
    <>
    <GetWantsHook setList={setVariantWants} type={type} />
    <br/>
    <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
    <br/><br/>
    <button onClick={e => setShow(!show)}>{show ? "Show all" : "Show only wanted"}</button>
    <div className="container">
        {show ? <WantLister wants={searchVarWants} changeEngine={changeEngine} type={type} /> : <WantLister wants={searchVar} changeEngine={changeEngine} type={type} />}
    </div>
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
  );
};

export default VariantWants;