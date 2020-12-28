import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import { GetMyWantsHook } from '../hooks/GetWantsHook';
import apiService from '../../serv/apiservice';
import WantsWindow from '../wants/WantsWindow';
import WantLister from '../wants/WantLister';

const ChangePass = () => {
    const [changePassword, setNewpass] = useState({ "newPassword": "", "oldPassword": "" });
    
    const pswHandler = (e) => {
        e.preventDefault();
        if(changePassword.newPassword !== changePassword.oldPassword){
            apiService.changePass(changePassword)
            .then(res => {
                window.alert('Password updated!');
                setNewpass({ "newPassword": "", "oldPassword": "" });
            })
            .catch(err => {
                if(err.response.status === 401){ window.alert("Invalid password.");
                } else if(err.response.status === 403){ window.alert("New password cannot be the same as current one!");
                } else if(err.response.status === 418){ window.alert("Server error, please try later.");
                } else if(err.response.status === 500){ window.alert("Database error, please try again later.");
                } else { window.alert("Unknown error, please try again later."); };
            });
        } else { window.alert('New password cannot be the same as current one!'); };
    };

    const setPswField = (value, fieldname) => {
        const tempPassword = {...changePassword};
        tempPassword[fieldname] = value; 
        setNewpass(tempPassword);
    };

    return (
        <>
        <form onSubmit={e => { pswHandler(e)}}>
            <h3>Change Password</h3>
            <input onChange={e => setPswField(e.target.value, "oldPassword")} type="password" placeholder="Current password" required value={changePassword.oldPassword} /><br/>
            <input onChange={e => setPswField(e.target.value, "newPassword")} type="password" placeholder="New password" required value={changePassword.newPassword} /><br/>
            <button type="submit">Change password</button>
        </form>
        </>
    );
};

const MyWants = () => {
    const [myLuckies, setMyLuckies] = useState([]);
    const [myAlways, setMyAlways] = useState([]);
    const [myAreans, setMyAreans] = useState([]);
    const [myVariants, setMyVariants] = useState([]);
    return (
        <>
        <GetMyWantsHook setList={setMyLuckies} type="lucky" />
        <GetMyWantsHook setList={setMyAlways} type="always" />
        <GetMyWantsHook setList={setMyAreans} type="arean" />
        <GetMyWantsHook setList={setMyVariants} type="variant" />
        <h2 className="centered">My Wants</h2>
        <WantsWindow always={myAlways} arean={myAreans} variant={myVariants} lucky={myLuckies} />
        </>
    );
};

const MyShinyWants = () => {
    const [myShiny, setMyShinyWants] = useState([]);
    return (
        <>
        <GetMyWantsHook setList={setMyShinyWants} type="shiny" />
        <h2 className="centered">My Shiny Wants</h2>
        {myShiny !== null && myShiny !== undefined && myShiny.length > 0 && <><div className="container"><WantLister wants={myShiny} type={"shiny"} /></div></>}
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

const MyCostumeWants = () => {
    const [myCostumes, setMyCostumes] = useState([]);
    return (
        <>
        <GetMyWantsHook setList={setMyCostumes} type="costume" />
        <h2 className="centered">My Costume Wants</h2>
        {myCostumes !== null && myCostumes !== undefined && myCostumes.length > 0 && <><div className="container"><WantLister wants={myCostumes} type={"costume"} /></div></>}
        <div className="backtothetop">
            <NavLink to="#" className="icon" onClick={e => window.scrollTo(0, 0)}><i className="fa fa-arrow-circle-o-up"></i></NavLink>
        </div>
        </>
    );
};

const Personal = () => {
    return (
        <>
        <div className="printlinks">
            <ul>
                <li><NavLink to={`/personal/password`} activeClassName="active">Change password</NavLink></li>
                <li><NavLink to={`/personal/wants/list`} activeClassName="active">Show my wants</NavLink></li>
                <li><NavLink to={`/personal/wants/shiny`} activeClassName="active">My shiny wants</NavLink></li>
                <li><NavLink to={`/personal/wants/costume`} activeClassName="active">Only costume wants</NavLink></li>
            </ul>
        </div>
        <Switch>
            <Route exact path={`/personal/password`} render={(props) => <ChangePass {...props} />} />
            <Route exact path={`/personal/wants/list`} render={(props) => <MyWants {...props} />} />
            <Route exact path={`/personal/wants/shiny`} render={(props) => <MyShinyWants {...props} />} />
            <Route exact path={`/personal/wants/costume`} render={(props) => <MyCostumeWants {...props} />} />
        </Switch>
        </>
    );
};

export default Personal;