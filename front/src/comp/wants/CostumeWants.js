import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const CostumeWants = ({type})  => {
  const [show, setShow] = useState(false);
  const [costumeWants, setCostumeWants] = useState([]);
  const [myCostumeWants, setMyCostumeWants] = useState([]);
  const [searchPara, setSearchPara] = useState( {"filtered": ""} );
  const [filCostume, setFilCostume] = useState([]);
  const [filWantCos, setFilWantCos] = useState([]);
  console.log(costumeWants)

  let searchCostume = searchPara.filtered.length > 0 ? filCostume : costumeWants;
  let searchCosWants = searchPara.filtered.length > 0 ? filWantCos : myCostumeWants;

  const mycostumehook = () => {
    let myTempWants = costumeWants.filter(p => p.cwant === 1);
    setMyCostumeWants(myTempWants);
  };
  useEffect(mycostumehook, [costumeWants]);

  const changeEngine = (e, id, value) => {
    e.stopPropagation();
    let tempPokemon = costumeWants.find(p => p.cid === id);
    tempPokemon = { ...tempPokemon, cwant: value };
    apiService.changeWant(id, tempPokemon, type)
    .then(res => {
        const tempPokemons = costumeWants.map(p => {
            if (p.cid === id) { p = tempPokemon; if(p.cwant === true) { p.cwant = 1;}; };
            return p;
        });
        setCostumeWants(tempPokemons);
        if(tempPokemon.cwant === true){ setMyCostumeWants(tempPokemon) };
        if(tempPokemon.name.startsWith(searchPara.filtered)){
            const tempFiltered = costumeWants.map(p => {
                if (p.cid === id) { p = tempPokemon; if(p.cwant === true) { p.cwant = 1;}; };
                return p;
            }).filter(p => String(p.name).startsWith(searchPara.filtered));
            setFilCostume(tempFiltered);
            let tempWantFilt = tempFiltered.filter(p => p.cwant === 1);
            setFilWantCos(tempWantFilt);
        };
    }).catch(err => { window.alert("Database error, please try again later.")});
};

  const searchFilter = (value, fieldname) => {
    const tempSearch = { ...searchPara };
    tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
    setSearchPara(tempSearch);
  };

  const mySearchHook = () => {
    let myTSearch = costumeWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilCostume(myTSearch);
    let myTWSearch = myCostumeWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilWantCos(myTWSearch);
  };
  useEffect(mySearchHook, [searchPara]);

  return (
    <>
    <GetWantsHook setList={setCostumeWants} type={type} />
    <br />
    <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
    <br /><br />
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

export default CostumeWants;