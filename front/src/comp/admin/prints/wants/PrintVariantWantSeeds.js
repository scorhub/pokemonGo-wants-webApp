import React, { useState } from 'react';
import SeedsHook from '../../../hooks/SeedHooks';

const Wants = ({ variant, index }) => {
    const idnum = index+1;
    return (
        <div>
            &#123;&nbsp;vwid&#58;&nbsp;{idnum}&#44;&nbsp;vwpid&#58;&nbsp;&#39;{variant.vwpid}&#39;&#44;&nbsp;uid&#58;&nbsp;&#39;{variant.uid}&#39;&#44;&nbsp;vwant&#58;&nbsp;&#39;{variant.vwant}&#39;&#125;&#44;
        </div>
    );
};

const PrintVariantWantSeeds = () => {
    const [wantSeeds, setWantSeeds] = useState([]);
    return (
        <>
        <SeedsHook setList={setWantSeeds} type={"variant"} />
        <div>
            <h3 className="centered">Print variant want seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {wantSeeds.filter(vwant => vwant.vwant === 1).map((p, index) => <Wants key={p.vwid} id={p.vwid} variant={p} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintVariantWantSeeds;