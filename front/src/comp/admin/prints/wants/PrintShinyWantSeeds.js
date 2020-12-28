import React, { useState } from 'react';
import SeedsHook from '../../../hooks/SeedHooks';

const Wants = ({ shinyWants, index }) => {
    const idnum = index+1;
    return (
        <div>
            &#123;&nbsp;swid&#58;&nbsp;{idnum}&#44;&nbsp;swpid&#58;&nbsp;&#39;{shinyWants.swpid}&#39;&#44;&nbsp;uid&#58;&nbsp;&#39;{shinyWants.uid}&#39;&#44;&nbsp;swant&#58;&nbsp;&#39;{shinyWants.swant}&#39;&#125;&#44;
        </div>
    );
};

const PrintWantSeeds = () => {
    const [shinyWants, setShinyWants] = useState([]);
    return (
        <>
        <SeedsHook setList={setShinyWants} type={"shiny"} />
        <div>
            <h3 className="centered">Print shiny want seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {shinyWants.filter(swant => swant.swant === 1).map((w, index) => <Wants key={w.swid} id={w.swid} shinyWants={w} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintWantSeeds;