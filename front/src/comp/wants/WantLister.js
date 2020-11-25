import React from 'react';
import ImageBox from '../ImageBox';

const PokemonMapper = ({ pokemon, changeEngine, type }) => {
    if (type === "lucky"){
        return ( <ImageBox id={pokemon.pid} pokeImg={pokemon.img} pokeId={pokemon.pid} pokeWant={pokemon.want} changeEngine={changeEngine} /> );
    } else if (type === "always"){
        return ( <ImageBox id={pokemon.pid} pokeImg={pokemon.img} pokeId={pokemon.pid} pokeWant={pokemon.awant} changeEngine={changeEngine} /> );
    } else if (type === "arean"){
        return ( <ImageBox id={pokemon.pid} pokeImg={pokemon.areanimg} pokeId={pokemon.aid} pokeWant={pokemon.arwant} changeEngine={changeEngine} /> );
    } else { return null; };
};

const WantLister = ({ wants, changeEngine, type }) => {
    if(wants === undefined) { return null } else {
    return (
    <>
    <div className="container">{wants.filter(pokemon => pokemon.number >= 1 && pokemon.number <= 151).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})} </div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 152 && p.number <= 251).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 252 && p.number <= 386).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 387 && p.number <= 493).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 494 && p.number <= 649).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 650 && p.number <= 721).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 722 && p.number <= 809).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    <br/>
    <div className="container">{wants.filter(p => p.number >= 810 && p.number <= 894).map(pokemon => {
        if (type === "lucky" || type === "always"){
            return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else if (type === "arean"){
            return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
        } else { return null };})}</div>
    </>
    );
    };
};

export default WantLister;