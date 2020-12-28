import React from 'react';
import WantLister from '../wants/WantLister';

const WantsWindow = ({always, arean, variant, lucky}) => {
    return (
        <>
    {always !== null && always !== undefined && always.length > 0 && <><h3 className="centered">Always</h3><div className="container"><WantLister wants={always} type={"always"} /></div></>}
    {arean !== null && arean !== undefined && arean.length > 0 && <><h3 className="centered">Arean</h3><div className="container"><WantLister wants={arean} type={"arean"} /></div></>}
    {variant !== null && variant !== undefined && variant.length > 0 && <><h3 className="centered">Variant</h3><div className="container"><WantLister wants={variant} type={"variant"} /></div></>}
    {lucky !== null && lucky !== undefined && lucky.length > 0 && <><h3 className="centered">Luckys</h3><div className="container"><WantLister wants={lucky} type={"lucky"} /></div></>}
        </>
    );
};

export default WantsWindow;