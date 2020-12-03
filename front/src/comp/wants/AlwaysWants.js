import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

const AlwaysWants = ({type})  => {
  const [show, setShow] = useState(false);
  const [alWants, setAlWants] = useState([]);
  const [myAlWants, setMyAlWants] = useState([]);
  const [searchPara, setSearchPara] = useState( {"filtered": ""} );
  const [filAlWants, setFilAlWants] = useState([]);
  const [filMyAlWants, setFilMyAlWants] = useState([]);

  let searchAlWants = searchPara.filtered.length > 0 ? filAlWants : alWants;
  let searchMyAlWants = searchPara.filtered.length > 0 ? filMyAlWants : myAlWants;

  const mywalantshook = () => {
    let myTempWants = alWants.filter(n => n.awant === 1);
    setMyAlWants(myTempWants);
  };
  useEffect(mywalantshook, [alWants]);

  const changeEngine = (e, id, value) => {
      e.stopPropagation();
      let tempPokemon = alWants.find(p => p.pid === id);
      tempPokemon = { ...tempPokemon, awant: value };
      apiService.changeWant(id, {awant: value}, type)
      .then(res => {
          const tempPokemons = alWants.map(p => {
              if (p.pid === id) { p = tempPokemon; if(p.awant === true) { p.awant = 1;}; };
              return p;
          });
          setAlWants(tempPokemons);
          if(tempPokemon.awant === true){ setMyAlWants(tempPokemon) };
          if(tempPokemon.name.startsWith(searchPara.filtered)){
              const tempFiltered = alWants.map(p => {
                  if (p.pid === id) { p = tempPokemon; if(p.awant === true) { p.awant = 1;}; };
                  return p;
              }).filter(p => String(p.name).startsWith(searchPara.filtered));
              setFilAlWants(tempFiltered);
              let tempWantFilt = tempFiltered.filter(p => p.awant === 1);
              setFilMyAlWants(tempWantFilt);
          };
      }).catch(err => {
        if(err.response.status === 400){ window.alert("Want sended in wrong format, please contact admin.");
        } else if(err.response.status === 403){ window.alert("Maximum amount of always wants is 50.");
        } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
        } else { window.alert("Unknown error, please try again later."); };
      });
  };

  const searchFilter = (value, fieldname) => {
    const tempSearch = { ...searchPara };
    tempSearch[fieldname] = value.length > 0 ? value[0].toUpperCase()+value.slice(1).toLowerCase() : value;
    setSearchPara(tempSearch);
  };

  const mySearchHook = () => {
    let myTSearch = alWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilAlWants(myTSearch);
    let myTWSearch = myAlWants.filter(p => String(p.name).startsWith(searchPara.filtered));
    setFilMyAlWants(myTWSearch);
  };
  useEffect(mySearchHook, [searchPara]);

  return (
    <>
    <GetWantsHook setList={setAlWants} type={type} />
    <br />
    <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
    <br /><br />
    <button onClick={e => setShow(!show)}>{show ? "Show all" : "Show only wanted"}</button>
    <div className="container">
        {show ? <WantLister wants={searchMyAlWants} changeEngine={changeEngine} type={type} /> : <WantLister wants={searchAlWants} changeEngine={changeEngine} type={type} />}
    </div>
    <div className="backtothetop">
        <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
    </div>
    </>
  );
};

export default AlwaysWants;