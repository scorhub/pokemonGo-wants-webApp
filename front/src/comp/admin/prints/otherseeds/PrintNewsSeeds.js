import React, { useState } from 'react';
import { OtherDataHook } from '../../../hooks/SeedHooks';

const News = ({news}) => {
    return (
        <div>
            &#123;&nbsp;nid&#58;&nbsp;{news.nid}&#44;&nbsp;nuid&#58;&nbsp;&#39;{news.nuid}&#39;&#44;&nbsp;ndate&#58;&nbsp;&#39;{news.ndate}&#39;&#44;&nbsp;ntitle&#58;&nbsp;&#39;{news.ntitle}&#39;&#44;&nbsp;ntext&#58;&nbsp;{news.ntext !== null ? "'" + news.ntext + "'" : "null"}&#44;&nbsp;archived&#58;&nbsp;{news.archived !== null ? "'" + news.archived + "'" : "null"}&nbsp;&#125;&#44;
        </div>
    );
};

const PrintNewsSeeds = () => {
    const [newsSeeds, setNewsSeeds] = useState([]);
    return (
        <>
        <OtherDataHook setList={setNewsSeeds} type={"news"} />
        <div>
            <h3 className="centered">Print news seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {newsSeeds.map(news => <News key={news.nid} id={news.nid} news={news} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintNewsSeeds;