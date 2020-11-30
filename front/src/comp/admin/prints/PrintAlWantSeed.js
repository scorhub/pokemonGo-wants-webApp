import React, { useState } from 'react';
import SeedsHook from '../../hooks/SeedHooks';

const AlWants = ({ alWants, index }) => {
    const idnum = index+1;
    return (
        <div>
            &#123;&nbsp;awid&#58;&nbsp;{idnum}&#44;&nbsp;awpid&#58;&nbsp;&#39;{alWants.awpid}&#39;&#44;&nbsp;uid&#58;&nbsp;&#39;{alWants.uid}&#39;&#44;&nbsp;awant&#58;&nbsp;&#39;{alWants.awant}&#39;&nbsp;&#125;&#44;
        </div>
    );
};

const PrintAlWantSeeds = () => {
    const [alWantSeeds, setAlWantSeeds] = useState([]);
    return (
        <>
        <SeedsHook setList={setAlWantSeeds} type={"always"} />
        <div>
            <h3 className="centered">Print always want seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {alWantSeeds.filter(awant => awant.awant === 1).map((aw, index) => <AlWants key={aw.awid} id={aw.awid} alWants={aw} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintAlWantSeeds;