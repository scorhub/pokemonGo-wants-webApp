import React, { useState } from 'react';
import { GetDataHook } from '../../../hooks/SeedHooks';

const SingleShiny = ({shiny}) => {
    const d = new Date(shiny.psupdated);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const updated = `${ye}-${mo}-${da}`;
    return (
    <div>
        &#123;&nbsp;sid&#58;&nbsp;{shiny.sid}&#44;&nbsp;spid&#58;&nbsp;{shiny.spid}&#44;&nbsp;shinyimg&#58;&nbsp;&#39;{shiny.shinyimg}&#39;&#44;&nbsp;psupdated&#58;&nbsp;{shiny.psupdated !== null ? "'" + updated + "'" : "null"}&#44;
    </div>
    );
};

const PrintShinyDataSeeds = () => {
    const [shinyData, setShinyData] = useState([]);
    return (
        <>
        <GetDataHook setList={setShinyData} type={"shiny"} />
        <div>
            <h3 className="centered">Print Shiny Data seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
            {shinyData.map(c => <SingleShiny key={c.sid} id={c.sid} shiny={c} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintShinyDataSeeds;