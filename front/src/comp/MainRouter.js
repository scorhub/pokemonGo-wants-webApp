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
import OtherWants, { OneWants } from './wants/OtherWants';
import Wants from './wants/Wants';
import AlwaysWants from './wants/AlwaysWants';
import AreanWants from './wants/AreanWants';
import CostumeWants from './wants/CostumeWants';
/* One component to handle all wantlists is not currently working.  */ 
// import MasterWant from './wants/MasterWant';

import PrintDataSeeds from './admin/prints/data/PrintDataSeeds';
import PrintAreanDataSeeds from './admin/prints/data/PrintAreanDataSeeds';
import PrintCostumeDataSeeds from './admin/prints/data/PrintCostumeDataSeeds';
import PrintWantSeeds from './admin/prints/wants/PrintWantSeeds';
import PrintAlWantSeeds from './admin/prints/wants/PrintAlWantSeed';
import PrintAreanWantSeeds from './admin/prints/wants/PrintAreanWantSeeds';
import PrintCostumeWantSeeds from './admin/prints/wants/PrintCostumeWantSeeds';
import PrintFeaturesSeeds from './admin/prints/otherseeds/PrintFeaturesSeeds';
import PrintEventSeeds from './admin/prints/otherseeds/PrintEventSeeds';
import PrintEventMonSeeds from './admin/prints/otherseeds/PrintEventMonSeeds';
import PrintNewsSeeds from './admin/prints/otherseeds/PrintNewsSeeds';

import AddPokemon from './admin/add/AddPokemon';
import AddCostume from './admin/add/AddCostume';
import AddTypes from './admin/add/AddTypes';
import AddGeneration from './admin/add/AddGeneration';
import AddRarity from './admin/add/AddRarity';
import AddReleased from './admin/add/AddReleased';
import AddMega from './admin/add/AddMega';
import ManageModerator from './admin/users/ManageModerator';
import WriteNews from './admin/news/WriteNews';
import ArchivedNews from './admin/news/ArchivedNews';
import AddEvent from './admin/events/AddEvent';
import PastEvents from './admin/events/PastEvents';

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
                    <Route exact path={`/news`} render={(props) => <News {...props} />} />
                    <Route exact path={`/events`} render={(props) => <Events {...props} />} />
                    <Route exact path={`/admin/print/dataseeds`} render={(props) => <PrintDataSeeds {...props} />} />
                    <Route exact path={`/admin/print/areandataseeds`} render={(props) => <PrintAreanDataSeeds {...props} />} />
                    <Route exact path={`/admin/print/costumedataseeds`} render={(props) => <PrintCostumeDataSeeds {...props} />} />
                    <Route exact path={`/admin/print/wantseeds`} render={(props) => <PrintWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/arwantseeds`} render={(props) => <PrintAlWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/areanwantseeds`} render={(props) => <PrintAreanWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/costumewantseeds`} render={(props) => <PrintCostumeWantSeeds {...props} />} />
                    <Route exact path={`/admin/print/featuresseeds`} render={(props) => <PrintFeaturesSeeds {...props} />} />
                    <Route exact path={`/admin/print/eventseeds`} render={(props) => <PrintEventSeeds {...props} />} />
                    <Route exact path={`/admin/print/eventmonsseeds`} render={(props) => <PrintEventMonSeeds {...props} />} />
                    <Route exact path={`/admin/print/newsseeds`} render={(props) => <PrintNewsSeeds {...props} />} />
                    <Route exact path={`/admin/add/pokemon`} render={(props) => <AddPokemon {...props} />} />
                    <Route exact path={`/admin/add/costume`} render={(props) => <AddCostume {...props} />} />
                    <Route exact path={`/admin/add/types`} render={(props) => <AddTypes {...props} />} />
                    <Route exact path={`/admin/add/generation`} render={(props) => <AddGeneration {...props} />} />
                    <Route exact path={`/admin/add/rarity`} render={(props) => <AddRarity {...props} />} />
                    <Route exact path={`/admin/add/released`} render={(props) => <AddReleased {...props} />} />
                    <Route exact path={`/admin/add/mega`} render={(props) => <AddMega {...props} />} />
                    <Route exact path={`/admin/users/moderator`} render={(props) => <ManageModerator {...props} />} />
                    <Route exact path={`/admin/news/write`} render={(props) => <WriteNews {...props} />} />
                    <Route exact path={`/admin/news/archived`} render={(props) => <ArchivedNews {...props} />} />
                    <Route exact path={`/admin/events/add`} render={(props) => <AddEvent {...props} />} />
                    <Route exact path={`/admin/events/past`} render={(props) => <PastEvents {...props} />} />
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