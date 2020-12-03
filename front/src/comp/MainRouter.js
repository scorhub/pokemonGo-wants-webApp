import React, { useState } from 'react';
import { Switch, Route } from "react-router-dom";

import Header from './parts/Header';
import Navbar from './parts/Navbar';
import Footer from './parts/Footer';
import PageNotFound from './PageNotFound';

import TokenHook from './hooks/TokenHook';
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

import PrintDataSeeds from './admin/prints/data/PrintDataSeeds';
import PrintAreanDataSeeds from './admin/prints/data/PrintAreanDataSeeds';
import PrintCostumeDataSeeds from './admin/prints/data/PrintCostumeDataSeeds';
import PrintWantSeeds from './admin/prints/wants/PrintWantSeeds';
import PrintAlWantSeeds from './admin/prints/wants/PrintAlWantSeed';
import PrintAreanWantSeeds from './admin/prints/wants/PrintAreanWantSeeds';
import PrintCostumeWantSeeds from './admin/prints/wants/PrintCostumeWantSeeds';

import AddPokemon from './admin/add/AddPokemon';
import AddCostume from './admin/add/AddCostume';
import AddTypes from './admin/add/AddTypes';
import AddGeneration from './admin/add/AddGeneration';
import AddRarity from './admin/add/AddRarity';
import AddReleased from './admin/add/AddReleased';
import AddMega from './admin/add/AddMega';
import PrintFeaturesSeeds from './admin/prints/PrintFeaturesSeeds';
import ManageModerator from './admin/users/ManageModerator';
import CostumeWants from './wants/CostumeWants';

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
                    <Route exact path={`/costume`} render={(props) => <CostumeWants {...props} type={"costume"} />} />
                    <Route exact path={`/otherwants`} render={(props) => <OtherWants {...props} users={users} />} />
                    <Route exact path={`/otherwants/:uid`} render={(props) => <OneWants {...props} users={users} />} />
                    <Route exact path={`/askfeature`} render={(props) => <AskFeature {...props} />} />
                    <Route exact path={`/personal`} render={(props) => <Personal {...props} />} />
                    <Route exact path={`/admin/print/dataseeds`} render={(props) => <PrintDataSeeds {...props} />} />
                    <Route exact path={`/admin/print/areandataseeds`} render={(props) => <PrintAreanDataSeeds {...props} />} />
                    <Route exact path={`/admin/print/costumedataseeds`} render={(props) => <PrintCostumeDataSeeds {...props} />} />
                    <Route exact path={`/admin/print/wantseeds`} render={(props) => <PrintWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/arwantseeds`} render={(props) => <PrintAlWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/areanwantseeds`} render={(props) => <PrintAreanWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/costumewantseeds`} render={(props) => <PrintCostumeWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/featuresseeds`} render={(props) => <PrintFeaturesSeeds {...props} />} />
                    <Route exact path={`/admin/add/pokemon`} render={(props) => <AddPokemon {...props} />} />
                    <Route exact path={`/admin/add/costume`} render={(props) => <AddCostume {...props} />} />
                    <Route exact path={`/admin/add/types`} render={(props) => <AddTypes {...props} />} />
                    <Route exact path={`/admin/add/generation`} render={(props) => <AddGeneration {...props} />} />
                    <Route exact path={`/admin/add/rarity`} render={(props) => <AddRarity {...props} />} />
                    <Route exact path={`/admin/add/released`} render={(props) => <AddReleased {...props} />} />
                    <Route exact path={`/admin/add/mega`} render={(props) => <AddMega {...props} />} />
                    <Route exact path={`/admin/users/moderator`} render={(props) => <ManageModerator {...props} />} />
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