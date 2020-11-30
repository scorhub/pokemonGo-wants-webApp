import React, { useState } from 'react';
import SeedsHook from '../../hooks/SeedHooks';

const Feature = ({feat}) => {
    return (
        <div>
            &#123;&nbsp;afid&#58;&nbsp;{feat.afid}&#44;&nbsp;afuid&#58;&nbsp;&#39;{feat.afuid}&#39;&#44;&nbsp;afdate&#58;&nbsp;&#39;{feat.afdate}&#39;&#44;&nbsp;aftitle&#58;&nbsp;&#39;{feat.aftitle}&#39;&#44;&nbsp;afinfo&#58;&nbsp;{feat.afinfo !== null ? "'" + feat.afinfo + "'" : "null"}&#44;&nbsp;addedtolist&#58;&nbsp;{feat.addedtolist}&#44;&nbsp;inprogress&#58;&nbsp;{feat.inprogress}&#44;&nbsp;completed&#58;&nbsp;{feat.completed}&#44;&nbsp;dnote&#58;&nbsp;{feat.dnote !== null ? "'" + feat.dnote + "'" : "null"}&nbsp;&#125;&#44;
        </div>
    );
};

const PrintFeaturesSeeds = () => {
    const [featuresSeeds, setFeaturesSeeds] = useState([]);
    return (
        <>
        <SeedsHook setList={setFeaturesSeeds} type={"features"} />
        <div>
            <h3 className="centered">Print features seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {featuresSeeds.map(feat => <Feature key={feat.afid} id={feat.afid} feat={feat} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintFeaturesSeeds;