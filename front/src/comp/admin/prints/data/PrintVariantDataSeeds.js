import React, { useState } from 'react';
import { GetDataHook } from '../../../hooks/SeedHooks';

const SingleVariant = ({variant}) => {
    const d = new Date(variant.pvupdated);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const updated = `${ye}-${mo}-${da}`;
    return (
    <div>
    &#123;&nbsp;vid&#58;&nbsp;{variant.vid}&#44;&nbsp;vpid&#58;&nbsp;{variant.vpid}&#44;&nbsp;vversion&#58;&nbsp;&#39;{variant.vversion}&#39;&#44;&nbsp;pvupdated&#58;&nbsp;{variant.pvupdated !== null ? "'" + updated + "'" : "null"}&#44;&nbsp;variantimg&#58;&nbsp;&#39;{variant.variantimg}&#39;&#125;&#44;
    </div>
    );
};

const PrintVariantDataSeeds = () => {
    const [variantData, setVariantData] = useState([]);
    return (
        <>
        <GetDataHook setList={setVariantData} type={"variant"} />
        <div>
            <h3 className="centered">Print Variant Data seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
            {variantData.map(vD => <SingleVariant key={vD.vid} id={vD.vid} variant={vD} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintVariantDataSeeds;