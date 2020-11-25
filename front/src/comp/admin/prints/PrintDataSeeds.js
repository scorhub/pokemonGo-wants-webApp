import React from 'react';

const SingleData = ({sData}) => {
    return (
    <div>
        &#123;&nbsp;pid&#58;&nbsp;{sData.pid}&#44;&nbsp;number&#58;&#39;{sData.number}&#39;&#44;&nbsp;name&#58;&#39;{sData.name}&#39;&#44;&nbsp;type1&#58;&#39;{sData.type1}&#39;&#44;&nbsp;type2&#58;&#39;{sData.type2}&#39;&#44;&nbsp;rarity&#58;&#39;{sData.rarity}&#39;&#44;&nbsp;img&#58;&#39;{sData.img}&#39;&nbsp;&#125;&#44;
    </div>
    );
};

const PrintDataSeeds = ({data}) => {
    return (
        <>
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