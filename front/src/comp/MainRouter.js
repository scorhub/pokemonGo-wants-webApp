import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './parts/Header';
import Navbar from './parts/Navbar';
import Footer from './parts/Footer';
import PageNotFound from './pages/PageNotFound';

import TokenHook from './hooks/TokenHook';
import { GetOthersHook } from './hooks/CommonHooks';

import Front from './pages/Front';
import AskFeature from './pages/AskFeature';
import Personal from './pages/Personal';
import News from './pages/News';
import Events from './pages/Events';
import OtherWants, { OneWantsRouter } from './wants/OtherWants';
import Wants from './wants/Wants';
import AlwaysWants from './wants/AlwaysWants';
import AreanWants from './wants/AreanWants';
import VariantWants from './wants/VariantWants';
import CostumeWants from './wants/CostumeWants';
import ShinyWants from './wants/ShinyWants';
/* One component to handle all wantlists is not currently working.  */ 
// import MasterWant from './wants/MasterWant';

import AdminRouter from './admin/AdminRouter';

const MainRouter = () => {
    const [users, setUsers] = useState([]);

    return (
        <>
        <Header />
        <Navbar />
        <div className="mainflex">
        <TokenHook />
        <GetOthersHook setList={setUsers} />
            <div className="maincontainer">
                <Switch>
                    <Route exact path={`/luckys`} render={(props) => <Wants {...props} type={"lucky"} />} />
                    <Route exact path={`/always`} render={(props) => <AlwaysWants {...props} type={"always"} />} />
                    <Route exact path={`/arean`} render={(props) => <AreanWants {...props} type={"arean"} />} />
                    <Route exact path={`/variant`} render={(props) => <VariantWants {...props} type={"variant"} />} />
                    <Route exact path={`/costume`} render={(props) => <CostumeWants {...props} type={"costume"} />} />
                    <Route exact path={`/shiny`} render={(props) => <ShinyWants {...props} type={"shiny"} />} />
                    <Route exact path={`/otherwants`} render={(props) => <OtherWants {...props} users={users} />} />
                    <Route path={`/otherwants/:uid`} render={(props) => <OneWantsRouter {...props} users={users} />} />
                    <Route exact path={`/askfeature`} render={(props) => <AskFeature {...props} />} />
                    <Route path={`/personal`} render={(props) => <Personal {...props} />} />
                    <Route exact path={`/news`} render={(props) => <News {...props} />} />
                    <Route exact path={`/events`} render={(props) => <Events {...props} />} />
                    <Route path={`/admin/`} render={(props) => <AdminRouter {...props} />} />
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