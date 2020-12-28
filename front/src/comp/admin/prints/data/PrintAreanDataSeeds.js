import React, { useState } from 'react';
import { GetDataHook } from '../../../hooks/SeedHooks';

const SingleArean = ({aData}) => {
    return (
    <div>
        &#123;&nbsp;aid&#58;&nbsp;{aData.aid}&#44;&nbsp;apid&#58;&nbsp;{aData.apid}&#44;&nbsp;paupdated&#58;&nbsp;{aData.paupdated !== null ? aData.paupdated : "null"}&#44;&nbsp;areanimg&#58;&nbsp;&#39;{aData.areanimg}&#39;&#125;&#44;
    </div>
    );
};

const PrintAreanDataSeeds = () => {
    const [areanData, setAreanData] = useState([]);
    return (
        <>
        <GetDataHook setList={setAreanData} type={"arean"} />
        <div>
            <h3 className="centered">Print Arean Data seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
            {areanData.map(aD => <SingleArean key={aD.aid} id={aD.aid} aData={aD} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintAreanDataSeeds;