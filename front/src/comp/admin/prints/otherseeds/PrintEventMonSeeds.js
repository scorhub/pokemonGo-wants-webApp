import React, { useState } from 'react';
import { OtherDataHook } from '../../../hooks/SeedHooks';

const EPokemon = ({epokemon}) => {
    return (
        <div>
            &#123;&nbsp;emid&#58;&nbsp;{epokemon.emid}&#44;&nbsp;eid&#58;&nbsp;&#39;{epokemon.eid}&#39;&#44;&nbsp;epid&#58;&nbsp;&#39;{epokemon.epid}&#39;&#44;&nbsp;&#125;&#44;
        </div>
    );
};

const PrintEventMonSeeds = () => {
    const [eventMonSeeds, setEventMonSeeds] = useState([]);
    return (
        <>
        <OtherDataHook setList={setEventMonSeeds} type={"eventmons"} />
        <div>
            <h3 className="centered">Print event Pokémon seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {eventMonSeeds.map(epokemon => <EPokemon key={epokemon.emid} id={epokemon.emid} epokemon={epokemon} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintEventMonSeeds;