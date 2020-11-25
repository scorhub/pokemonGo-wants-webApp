import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './parts/Header';
import Navbar from './parts/Navbar';
import Footer from './parts/Footer';
import PageNotFound from './PageNotFound';

import TokenHook from './hooks/TokenHook';
import GetDataHook from './hooks/GetDataHook';
import GetOthersHook from './hooks/GetOthersHook';

import Front from './Front';
import AskFeature from './AskFeature';
import OtherWants, { OneWants } from './wants/OtherWants';
import Wants from './wants/Wants';
import AlwaysWants from './wants/AlwaysWants';
import AreanWants from './wants/AreanWants';
/* One component to handle all wantlists is not currently working.  */ 
// import MasterWant from './wants/MasterWant';
import Personal from './Personal';

import AddData from './admin/AddData';
import PrintDataSeeds from './admin/prints/PrintDataSeeds';
import PrintWantSeeds from './admin/prints/PrintWantSeeds';
import PrintAlWantSeeds from './admin/prints/PrintAlWantSeed';
import PrintAreanWantSeeds from './admin/prints/PrintAreanWantSeeds';

const MainRouter = () => {
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);

    return (
        <>
        <Header />
        <Navbar />
        <div className="mainflex">
        <TokenHook />
        <GetDataHook setList={setData} />
        <GetOthersHook setList={setUsers} />
            <div className="maincontainer">
                <Switch>
                    <Route exact path={`/luckys`} render={(props) => <Wants {...props} type={"lucky"} />} />
                    <Route exact path={`/always`} render={(props) => <AlwaysWants {...props} type={"always"} />} />
                    <Route exact path={`/arean`} render={(props) => <AreanWants {...props} type={"arean"} />} />
                    <Route exact path={`/otherwants`} render={(props) => <OtherWants {...props} users={users} />} />
                    <Route exact path={`/otherwants/:uid`} render={(props) => <OneWants {...props} users={users} />} />
                    <Route exact path={`/askfeature`} render={(props) => <AskFeature {...props} />} />
                    <Route exact path={`/personal`} render={(props) => <Personal {...props} />} />
                    <Route exact path={`/admin/adddata`} render={(props) => <AddData {...props} data={data} />} />
                    <Route exact path={`/admin/print/printdataseeds`} render={(props) => <PrintDataSeeds {...props} data={data} />} />
                    <Route exact path={`/admin/print/printwantseeds`} render={(props) => <PrintWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/printarwantseeds`} render={(props) => <PrintAlWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/printareanwantseeds`} render={(props) => <PrintAreanWantSeeds {...props} />} />
                    <Route exact path={`/`} render={(props) => <Front {...props} />} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default MainRouter;