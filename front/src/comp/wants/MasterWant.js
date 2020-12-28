import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import apiService from '../../serv/apiservice';
import GetWantsHook from '../hooks/GetWantsHook';
import WantLister from './WantLister';

/* Component MasterWant not currently working and not in use. */

const MasterWant = ({type}) => {
    const [show, setShow] = useState(false);
    const [wants, setWants] = useState([]);
    const [myWants, setMyWants] = useState([]);
    const [searchPara, setSearchPara] = useState( {"filtered": ""} );
    const [filterWants, setFilterWants] = useState([]);
    const [filterMyWants, setFilterMyWants] = useState([]);
  
    let searchWants = searchPara.filtered.length > 0 ? filterWants : wants;
    let searchMyWants = searchPara.filtered.length > 0 ? filterMyWants : myWants;
  
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
  
    const mywantshook = () => {
        let myTempWants = null;
        if (type === "lucky"){ myTempWants = wants.filter(p => p.want === 1);
        } else if (type === "always"){ myTempWants = wants.filter(p => p.awant === 1);
        } else if (type === "arean") { myTempWants = wants.filter(p => p.arwant === 1);
        } else { return null; };
      setMyWants(myTempWants);
    };
    useEffect(mywantshook, [wants]);

    if (type === "lucky"){
        console.log("type: ", type);
    } else if (type === "always"){
        console.log("type: ", type);
    } else if (type === "arean") {
        console.log("type: ", type);
    } else { return null; };

    const changeEngine = (e, id, value) => {
        e.stopPropagation();
        let tempPokemon = null;
        if (type === "lucky"){
            tempPokemon = wants.find(p => p.pid === id);
            tempPokemon = { ...tempPokemon, want: value };
        } else if (type === "always"){
            tempPokemon = wants.find(p => p.pid === id);
            tempPokemon = { ...tempPokemon, awant: value };
        } else if (type === "arean") {
            tempPokemon = wants.find(n => n.aid === id);
            tempPokemon = { ...tempPokemon, arwant: value };
        } else { return null; };
        apiService.changeWant(id, tempPokemon, type)
        .then(res => {
            const tempPokemons = wants.map(p => {
                if (type === "lucky"){ if (p.pid === id) { p = tempPokemon; if(p.want === true) { p.want = 1;}; };
                } else if (type === "always"){ if (p.pid === id) { p = tempPokemon; if(p.awant === true) { p.awant = 1;}; };
                } else if (type === "arean") { if (p.aid === id) { p = tempPokemon; if(p.arwant === true) { p.arwant = 1;}; };
                } else { return null; };
                return p;
            });
            setWants(tempPokemons);
            if (type === "lucky"){ if(tempPokemon.want === true){ setMyWants(tempPokemon) };
            } else if (type === "always"){ if(tempPokemon.awant === true){ setMyWants(tempPokemon) };
            } else if (type === "arean") { if(tempPokemon.arwant === true){ setMyWants(tempPokemon) };
            } else { return null; };
            if(tempPokemon.name.startsWith(searchPara.filtered)){
                const tempFiltered = wants.map(p => {
                    if (type === "lucky"){ if (p.pid === id) { p = tempPokemon; if(p.want === true) { p.want = 1;}; };
                    } else if (type === "always"){ if (p.pid === id) { p = tempPokemon; if(p.awant === true) { p.awant = 1;}; };
                    } else if (type === "arean") { if (p.aid === id) { p = tempPokemon; if(p.arwant === true) { p.arwant = 1;}; };
                    } else { return null; };
                    return p;
                }).filter(p => String(p.name).startsWith(searchPara.filtered));
                setFilterWants(tempFiltered);
                let tempWantFilt = null;
                if (type === "lucky"){ tempWantFilt = tempFiltered.filter(p => p.want === 1);
                } else if (type === "always"){ tempWantFilt = tempFiltered.filter(p => p.awant === 1);
                } else if (type === "arean") { tempWantFilt = tempFiltered.filter(p => p.arwant === 1);
                } else { return null; };
                setFilterMyWants(tempWantFilt);
            };
        }).catch(err => { console.log('error: ', err) });
    };
  
    return (
      <>
      <GetWantsHook setList={setWants} type={type} />
      <br/>
      <input onChange={e => searchFilter(e.target.value, "filtered")} placeholder="Search by name" type="text"></input>
      <br/><br/>
      <button onClick={e => setShow(!show)}>{show ? "Show all" : "Show only wanted"}</button>
      <div className="container">
          {show ? <WantLister wants={searchMyWants} chnWant={changeEngine} type={type} /> : <WantLister wants={searchWants} chnWant={changeEngine} type={type} />}
      </div>
      <div className="backtothetop">
          <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
      </div>
      </>
    );
};

export default MasterWant;