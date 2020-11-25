import React, { useState } from 'react';
import GetMyWantsHook from './hooks/GetMyWantsHook';
import WantLister from './wants/WantLister';
import apiService from '../serv/apiservice';

const Personal = () => {
    const [myLuckies, setMyLuckies] = useState([]);
    const [myAlways, setMyAlways] = useState([]);
    const [myAreans, setMyAreans] = useState([]);
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
        <GetMyWantsHook setList={setMyLuckies} type="lucky" />
        <GetMyWantsHook setList={setMyAlways} type="always" />
        <GetMyWantsHook setList={setMyAreans} type="arean" />

        <form onSubmit={e => { pswHandler(e)}}>
            <h3>Change Password</h3>
            <input onChange={e => setPswField(e.target.value, "oldPassword")} type="password" placeholder="Current password" required value={changePassword.oldPassword} /><br />
            <input onChange={e => setPswField(e.target.value, "newPassword")} type="password" placeholder="New password" required value={changePassword.newPassword} /><br />
            <button type="submit">Change password</button>
        </form>
        
        <h2 className="centered">My Wants</h2>

        {myAlways.length > 0 && <><h3 className="centered">Always</h3><div className="container"><WantLister wants={myAlways} type={"always"} /></div></>}

        {myAreans.length > 0 && <><h3 className="centered">Arean</h3><div className="container"><WantLister wants={myAreans} type={"arean"} /></div></>}

        {myLuckies.length > 0 && <><h3 className="centered">Luckys</h3><div className="container"><WantLister wants={myLuckies} type={"lucky"} /></div></>}
        </>
    );
};

export default Personal;