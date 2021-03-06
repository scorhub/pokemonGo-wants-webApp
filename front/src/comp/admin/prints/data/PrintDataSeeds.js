import React, { useState } from 'react';
import { GetDataHook } from '../../../hooks/SeedHooks';

const SingleData = ({sData}) => {
    const d = new Date(sData.pupdated);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const updated = `${ye}-${mo}-${da}`;
    return (
    <div className="printdata">
    &#123;&nbsp;pid&#58;&nbsp;{sData.pid}&#44;&nbsp;number&#58;&nbsp;&#39;{sData.number}&#39;&#44;&nbsp;name&#58;&nbsp;&#39;{sData.name}&#39;&#44;&nbsp;type1&#58;&nbsp;{sData.type1 !== null ? "'"+sData.type1+"'" : "null"}&#44;&nbsp;type2&#58;&nbsp;{sData.type2 !== null ? "'"+sData.type2+"'" : "null"}&#44;&nbsp;rarity&#58;&nbsp;{sData.rarity !== null ? "'"+sData.rarity+"'" : "null"}&#44;&nbsp;subrarity&#58;&nbsp;{sData.subrarity !== null ? "'"+sData.subrarity+"'" : "null"}&#44;&nbsp;released&#58;&nbsp;{sData.released !== null ? sData.released : "null"}&#44;&nbsp;mega&#58;&nbsp;{sData.mega !== null ? sData.mega : "null"}&#44;&nbsp;generation&#58;&nbsp;{sData.generation}&#44;&nbsp;pupdated&#58;&nbsp;{sData.pupdated !== null ? "'" + updated + "'" : "null"}&#44;&nbsp;img&#58;&nbsp;&#39;{sData.img}&#39;&#44;&nbsp;maleimg&#58;&nbsp;{sData.maleimg !== null ? "'"+sData.maleimg+"'" : "null"}&#44;&nbsp;femimg&#58;&nbsp;{sData.femimg !== null ? "'"+sData.femimg+"'" : "null"}&nbsp;&#125;&#44;
    </div>
    );
};

const PrintDataSeeds = () => {
    const [data, setData] = useState([]);
    return (
        <>
        <GetDataHook setList={setData} type={"normal"} />
        <div>
            <h3 className="centered">Print Data seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
            {data.map(d => <SingleData key={d.pid} id={d.pid} sData={d} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintDataSeeds;