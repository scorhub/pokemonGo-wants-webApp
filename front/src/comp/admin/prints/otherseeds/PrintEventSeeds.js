import React, { useState } from 'react';
import { OtherDataHook } from '../../../hooks/SeedHooks';

const Event = ({event}) => {
    return (
        <div>
            &#123;&nbsp;eid&#58;&nbsp;{event.eid}&#44;&nbsp;ename&#58;&nbsp;&#39;{event.ename}&#39;&#44;&nbsp;etext&#58;&nbsp;{event.etext !== null ? "'" + event.etext + "'" : "null"}&#44;&nbsp;estart&#58;&nbsp;{event.estart !== null ? "'" + event.estart + "'" : "null"}&#44;&nbsp;eend&#58;&nbsp;{event.eend !== null ? "'" + event.eend + "'" : "null"}&nbsp;elink&#58;&nbsp;{event.elink !== null ? "'" + event.elink + "'" : "null"}&nbsp;&#125;&#44;
        </div>
    );
};

const PrintEventSeeds = () => {
    const [eventSeeds, setEventSeeds] = useState([]);
    return (
        <>
        <OtherDataHook setList={setEventSeeds} type={"events"} />
        <div>
            <h3 className="centered">Print event seeds</h3>
        </div>
        <div className="container pad1em">
            module&#46;exports &#61; &#91;
                {eventSeeds.map(event => <Event key={event.eid} id={event.eid} event={event} />)}
            &#93;
        </div>
        </>
    );
};

export default PrintEventSeeds;