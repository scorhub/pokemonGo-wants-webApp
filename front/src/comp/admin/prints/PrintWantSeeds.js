import React, { useState } from 'react';
import WantSeedsHook from '../../hooks/SeedHooks';

const Wants = ({ wants, index }) => {
    const idnum = index+1;
    return (
        <div>
            &#123;&nbsp;wid&#58;&nbsp;{idnum}&#44;&nbsp;wpid&#58;&#39;{wants.wpid}&#39;&#44;&nbsp;uid&#58;&#39;{wants.uid}&#39;&#44;&nbsp;want&#58;&#39;{wants.want}&#39;&nbsp;&#125;&#44;
        </div>
    );
};

const PrintWantSeeds = () => {
    const [wantSeeds, setWantSeeds] = useState([]);
    return (
        <>
        <WantSeedsHook setList={setWantSeeds} type={"lucky"} />
        <div>
            <h3 className="centered">Print want seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {wantSeeds.filter(want => want.want === 1).map((w, index) => <Wants key={w.wid} id={w.wid} wants={w} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintWantSeeds;