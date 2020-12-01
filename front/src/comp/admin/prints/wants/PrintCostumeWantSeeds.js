import React, { useState } from 'react';
import SeedsHook from '../../../hooks/SeedHooks';

const Wants = ({ cosWants, index }) => {
    const idnum = index+1;
    return (
        <div>
            &#123;&nbsp;cwid&#58;&nbsp;{idnum}&#44;&nbsp;cwpid&#58;&nbsp;&#39;{cosWants.cwpid}&#39;&#44;&nbsp;uid&#58;&nbsp;&#39;{cosWants.uid}&#39;&#44;&nbsp;cwant&#58;&nbsp;&#39;{cosWants.cwant}&#39;&#125;&#44;
        </div>
    );
};

const PrintWantSeeds = () => {
    const [cosWants, setCosWants] = useState([]);
    return (
        <>
        <SeedsHook setList={setCosWants} type={"costume"} />
        <div>
            <h3 className="centered">Print costume want seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {cosWants.filter(cwant => cwant.cwant === 1).map((w, index) => <Wants key={w.cwid} id={w.cwid} cosWants={w} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintWantSeeds;