import React, { useState } from 'react';
import WantSeedsHook from '../../hooks/SeedHooks';

const Wants = ({ areanWants, index }) => {
    const idnum = index+1;
    return (
        <div>
            &#123;&nbsp;arwid&#58;&nbsp;{idnum}&#44;&nbsp;arwpid&#58;&#39;{areanWants.arwpid}&#39;&#44;&nbsp;uid&#58;&#39;{areanWants.uid}&#39;&#44;&nbsp;arwant&#58;&#39;{areanWants.arwant}&#39;&#125;&#44;
        </div>
    );
};

const PrintWantSeeds = () => {
    const [areanWants, setWantSeeds] = useState([]);
    return (
        <>
        <WantSeedsHook setList={setWantSeeds} type={"arean"} />
        <div>
            <h3 className="centered">Print arean want seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {areanWants.filter(arwant => arwant.arwant === 1).map((w, index) => <Wants key={w.arwid} id={w.arwid} areanWants={w} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintWantSeeds;