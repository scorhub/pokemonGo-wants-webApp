import React from 'react';
import ImageBox from './ImageBox';

const PokemonMapper = ({ pokemon, changeEngine, type }) => {
    if (type === "lucky"){
        return ( <ImageBox id={pokemon.pid} pokeImg={pokemon.img} pokeId={pokemon.pid} pokeWant={pokemon.want} changeEngine={changeEngine} /> );
    } else if (type === "always"){
        return ( <ImageBox id={pokemon.pid} pokeImg={pokemon.img} pokeId={pokemon.pid} pokeWant={pokemon.awant} changeEngine={changeEngine} /> );
    } else if (type === "arean"){
        return ( <ImageBox id={pokemon.pid} pokeImg={pokemon.areanimg} pokeId={pokemon.aid} pokeWant={pokemon.arwant} changeEngine={changeEngine} /> );
    } else if (type === "variant"){
        return ( <ImageBox id={pokemon.vid} pokeImg={pokemon.variantimg} pokeId={pokemon.vid} pokeWant={pokemon.vwant} changeEngine={changeEngine} /> );
    } else if (type === "costume"){
        return ( <ImageBox id={pokemon.cid} pokeImg={pokemon.costumeimg} pokeId={pokemon.cid} pokeWant={pokemon.cwant} changeEngine={changeEngine} /> );
    } else if (type === "shiny"){
        return ( <ImageBox id={pokemon.sid} pokeImg={pokemon.shinyimg} pokeId={pokemon.sid} pokeWant={pokemon.swant} changeEngine={changeEngine} /> );
    } else { return null; };
};

const GenerationDiv = ({wants, generation, changeEngine, type}) => {
    return (
        <div className="container">
            {wants.filter(p => p.generation === generation).map(pokemon => {
            if (type === "lucky" || type === "always"){
                return ( <PokemonMapper key={pokemon.pid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
            } else if (type === "arean"){
                return ( <PokemonMapper key={pokemon.aid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
            } else if (type === "variant"){
                return ( <PokemonMapper key={pokemon.vid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
            } else if (type === "costume"){
                return ( <PokemonMapper key={pokemon.cid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
            } else if (type === "shiny"){
                return ( <PokemonMapper key={pokemon.sid} pokemon={pokemon} changeEngine={changeEngine} type={type} /> );
            } else { return null };})}
        </div>
    );
};

const WantLister = ({ wants, changeEngine, type }) => {
    if(wants === undefined || wants === null) { return null; } else {
        return (
        <>
        <GenerationDiv wants={wants} generation={1} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={2} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={3} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={4} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={5} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={6} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={7} changeEngine={changeEngine} type={type} />
        <br/>
        <GenerationDiv wants={wants} generation={8} changeEngine={changeEngine} type={type} />
        </>
        );
    };
};

export default WantLister;