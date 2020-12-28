import React, { useState } from 'react';
import { GetDataHook } from '../../../hooks/SeedHooks';

const SingleCostume = ({costume, index}) => {
    const idnum = index+1;
    const d = new Date(costume.cfirstappearance);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const released = `${ye}-${mo}-${da}`;
    const d2 = new Date(costume.pcupdated);
    const ye2 = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d2);
    const mo2 = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d2);
    const da2 = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d2);
    const updated = `${ye2}-${mo2}-${da2}`;

    return (
    <div>
        &#123;&nbsp;cid&#58;&nbsp;{idnum}&#44;&nbsp;cpid&#58;&nbsp;{costume.cpid}&#44;&nbsp;version&#58;&nbsp;&#39;{costume.version}&#39;&#44;&nbsp;cfirstappearance&#58;&nbsp;{costume.cfirstappearance !== null ? "'" + released + "'" : "null"}&#44;&nbsp;pcupdated&#58;&nbsp;{costume.pcupdated !== null ? "'" + updated + "'" : "null"}&#44;&nbsp;costumeimg&#58;&nbsp;&#39;{costume.costumeimg}&#39;&#125;&#44;
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
            {costumeData.map((c, index) => <SingleCostume key={c.cid} id={c.cid} costume={c} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintCostumeDataSeeds;