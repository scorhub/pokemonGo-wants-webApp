import React, { useState } from 'react';
import { GetDataHook } from '../../../hooks/SeedHooks';

const SingleCostume = ({costume, index}) => {
    const idnum = index+1;
    return (
    <div>
        &#123;&nbsp;cid&#58;&nbsp;{idnum}&#44;&nbsp;cpid&#58;&nbsp;{costume.cpid}&#44;&nbsp;version&#58;&nbsp;&#39;{costume.version}&#39;&#44;&nbsp;cfirstappearance&#58;&nbsp;{costume.cfirstappearance !== null ? "'" + costume.cfirstappearance + "'" : "null"}&#44;&nbsp;pcupdated&#58;&nbsp;{costume.pcupdated !== null ? "'" + costume.pcupdated + "'" : "null"}&#44;&nbsp;costumeimg&#58;&nbsp;&#39;{costume.costumeimg}&#39;&#125;&#44;
    </div>
    );
};

const PrintCostumeDataSeeds = () => {
    const [costumeData, setCostumeData] = useState([]);
    return (
        <>
        <GetDataHook setList={setCostumeData} type={"costume"} />
        <div>
            <h3 className="centered">Print Costume Data seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
            {costumeData.map((c, index) => <SingleCostume key={c.aid} id={c.aid} costume={c} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintCostumeDataSeeds;