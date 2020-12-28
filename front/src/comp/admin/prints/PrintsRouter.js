import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';

import PrintDataSeeds from './data/PrintDataSeeds';
import PrintAreanDataSeeds from './data/PrintAreanDataSeeds';
import PrintVariantDataSeeds from './data/PrintVariantDataSeeds';
import PrintCostumeDataSeeds from './data/PrintCostumeDataSeeds';
import PrintShinyDataSeeds from './data/PrintShinyDataSeeds';
import PrintWantSeeds from './wants/PrintWantSeeds';
import PrintAlWantSeeds from './wants/PrintAlWantSeed';
import PrintAreanWantSeeds from './wants/PrintAreanWantSeeds';
import PrintVariantWantSeeds from './wants/PrintVariantWantSeeds';
import PrintCostumeWantSeeds from './wants/PrintCostumeWantSeeds';
import PrintShinyWantSeeds from './wants/PrintShinyWantSeeds';
import PrintFeaturesSeeds from './otherseeds/PrintFeaturesSeeds';
import PrintEventSeeds from './otherseeds/PrintEventSeeds';
import PrintEventMonSeeds from './otherseeds/PrintEventMonSeeds';
import PrintNewsSeeds from './otherseeds/PrintNewsSeeds';

const PrintsRouter = () => {
    return (
        <>
        <div className="printlinks">
            <ul>
                <li><NavLink to={`/admin/print/data/pokemon`} activeClassName="active">Pokémon Data</NavLink></li>
                <li><NavLink to={`/admin/print/data/arean`} activeClassName="active">Arean Data</NavLink></li>
                <li><NavLink to={`/admin/print/data/variant`} activeClassName="active">Variant Data</NavLink></li>
                <li><NavLink to={`/admin/print/data/costume`} activeClassName="active">Costume Data</NavLink></li>
                <li><NavLink to={`/admin/print/data/shiny`} activeClassName="active">Shiny Data</NavLink></li>
                <li><NavLink to={`/admin/print/wants/lucky`} activeClassName="active">Lucky Wants</NavLink></li>
                <li><NavLink to={`/admin/print/wants/always`} activeClassName="active">Always Wants</NavLink></li>
                <li><NavLink to={`/admin/print/wants/arean`} activeClassName="active">Arean Wants</NavLink></li>
                <li><NavLink to={`/admin/print/wants/variant`} activeClassName="active">Variant Wants</NavLink></li>
                <li><NavLink to={`/admin/print/wants/costume`} activeClassName="active">Costume Wants</NavLink></li>
                <li><NavLink to={`/admin/print/wants/shiny`} activeClassName="active">Shiny Wants</NavLink></li>
                <li><NavLink to={`/admin/print/newsseeds`} activeClassName="active">News</NavLink></li>
                <li><NavLink to={`/admin/print/eventseeds`} activeClassName="active">Events</NavLink></li>
                <li><NavLink to={`/admin/print/featuresseeds`} activeClassName="active">Features</NavLink></li>
                <li><NavLink to={`/admin/print/eventmonsseeds`} activeClassName="active">Event Pokémons</NavLink></li>
            </ul>
        </div>
        <Switch>
            <Route exact path={`/admin/print/data/pokemon`} render={(props) => <PrintDataSeeds {...props} />} />
            <Route exact path={`/admin/print/data/arean`} render={(props) => <PrintAreanDataSeeds {...props} />} />
            <Route exact path={`/admin/print/data/variant`} render={(props) => <PrintVariantDataSeeds {...props} />} />
            <Route exact path={`/admin/print/data/costume`} render={(props) => <PrintCostumeDataSeeds {...props} />} />
            <Route exact path={`/admin/print/data/shiny`} render={(props) => <PrintShinyDataSeeds {...props} />} />
            <Route exact path={`/admin/print/wants/lucky`} render={(props) => <PrintWantSeeds {...props} />} />
            <Route exact path={`/admin/print/wants/always`} render={(props) => <PrintAlWantSeeds {...props} />} />
            <Route exact path={`/admin/print/wants/arean`} render={(props) => <PrintAreanWantSeeds {...props} />} />
            <Route exact path={`/admin/print/wants/variant`} render={(props) => <PrintVariantWantSeeds {...props} />} />
            <Route exact path={`/admin/print/wants/costume`} render={(props) => <PrintCostumeWantSeeds {...props} />} />
            <Route exact path={`/admin/print/wants/shiny`} render={(props) => <PrintShinyWantSeeds {...props} />} />
            <Route exact path={`/admin/print/newsseeds`} render={(props) => <PrintNewsSeeds {...props} />} />
            <Route exact path={`/admin/print/eventseeds`} render={(props) => <PrintEventSeeds {...props} />} />
            <Route exact path={`/admin/print/featuresseeds`} render={(props) => <PrintFeaturesSeeds {...props} />} />
            <Route exact path={`/admin/print/eventmonsseeds`} render={(props) => <PrintEventMonSeeds {...props} />} />
        </Switch>
        </>
    );
};

export default PrintsRouter;