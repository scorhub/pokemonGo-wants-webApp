import React, { useState } from 'react';
import { OtherDataHook } from '../../../hooks/SeedHooks';

const Feature = ({feat, index}) => {
    const idnum = index+1;
    const d = new Date(feat.afdate);
    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    const askdate = `${ye}-${mo}-${da}`;
    return (
        <div>
            &#123;&nbsp;afid&#58;&nbsp;{idnum}&#44;&nbsp;afuid&#58;&nbsp;&#39;{feat.afuid}&#39;&#44;&nbsp;afdate&#58;&nbsp;&#39;{askdate}&#39;&#44;&nbsp;aftitle&#58;&nbsp;&#39;{feat.aftitle}&#39;&#44;&nbsp;afinfo&#58;&nbsp;{feat.afinfo !== null ? "'" + feat.afinfo + "'" : "null"}&#44;&nbsp;addedtolist&#58;&nbsp;{feat.addedtolist}&#44;&nbsp;inprogress&#58;&nbsp;{feat.inprogress}&#44;&nbsp;completed&#58;&nbsp;{feat.completed}&#44;&nbsp;dnote&#58;&nbsp;{feat.dnote !== null ? "'" + feat.dnote + "'" : "null"}&#44;&nbsp;farchived&#58;&nbsp;{feat.farchived}&nbsp;&#125;&#44;
        </div>
    );
};

const PrintFeaturesSeeds = () => {
    const [featuresSeeds, setFeaturesSeeds] = useState([]);
    return (
        <>
        <OtherDataHook setList={setFeaturesSeeds} type={"features"} />
        <div>
            <h3 className="centered">Print features seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {featuresSeeds.filter(f => f.farchived !== 1).map((feat, index) => <Feature key={feat.afid} id={feat.afid} feat={feat} index={index} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintFeaturesSeeds;