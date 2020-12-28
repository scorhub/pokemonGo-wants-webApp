import React from 'react';
import { Switch, Route } from "react-router-dom";

import { AdminTokenHook } from '../hooks/AdminHooks';

import PrintsRouter from './prints/PrintsRouter';
import AddPokemon from './add/AddPokemon';
import AddArean from './add/AddArean';
import AddVariant from './add/AddVariant';
import AddCostume from './add/AddCostume';
import AddShiny from './add/AddShiny';
import AddTypes from './add/AddTypes';
import AddGeneration from './add/AddGeneration';
import AddRarity from './add/AddRarity';
import AddReleased from './add/AddReleased';
import AddMega from './add/AddMega';
import UpdImage from './upd/UpdImage';
import ManageModerator from './users/ManageModerator';
import WriteNews from './news/WriteNews';
import ArchivedNews from './news/ArchivedNews';
import AddEvent from './events/AddEvent';
import PastEvents from './events/PastEvents';
import ArchivedFeatures from './ArchivedFeatures';

const MainRouter = () => {

    return (
        <>
        <AdminTokenHook />
        <Switch>
            <Route path={`/admin/print/`} render={(props) => <PrintsRouter {...props} />} />
            <Route exact path={`/admin/add/pokemon`} render={(props) => <AddPokemon {...props} />} />
            <Route exact path={`/admin/add/arean`} render={(props) => <AddArean {...props} />} />
            <Route exact path={`/admin/add/variant`} render={(props) => <AddVariant {...props} />} />
            <Route exact path={`/admin/add/costume`} render={(props) => <AddCostume {...props} />} />
            <Route exact path={`/admin/add/shiny`} render={(props) => <AddShiny {...props} />} />
            <Route exact path={`/admin/add/types`} render={(props) => <AddTypes {...props} />} />
            <Route exact path={`/admin/add/generation`} render={(props) => <AddGeneration {...props} />} />
            <Route exact path={`/admin/add/rarity`} render={(props) => <AddRarity {...props} />} />
            <Route exact path={`/admin/add/released`} render={(props) => <AddReleased {...props} />} />
            <Route exact path={`/admin/add/mega`} render={(props) => <AddMega {...props} />} />
            <Route exact path={`/admin/upd/normal/image`} render={(props) => <UpdImage {...props} />} />
            <Route exact path={`/admin/users/moderator`} render={(props) => <ManageModerator {...props} />} />
            <Route exact path={`/admin/news/write`} render={(props) => <WriteNews {...props} />} />
            <Route exact path={`/admin/news/archived`} render={(props) => <ArchivedNews {...props} />} />
            <Route exact path={`/admin/events/add`} render={(props) => <AddEvent {...props} />} />
            <Route exact path={`/admin/events/past`} render={(props) => <PastEvents {...props} />} />
            <Route exact path={`/admin/features/archived`} render={(props) => <ArchivedFeatures {...props} />} />
        </Switch>
        </>
    );
};

export default MainRouter;