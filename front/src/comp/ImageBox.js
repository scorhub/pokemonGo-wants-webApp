import React from 'react';

const ImageBox = ({pokeImg, pokeId, pokeWant, changeEngine}) => {
    const boxStyle = pokeWant ? "wanted" : "notWanted";
    const backimage = {
        backgroundImage: 'url(' + pokeImg + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '110%',
        width: '75px',
        height: '75px'
    };
    return ( <div className={boxStyle} onClick={e => changeEngine !== undefined && changeEngine(e, pokeId, !pokeWant) } checked={pokeWant} style={backimage} /> );
};

export default ImageBox;