import React, { useState } from "react";
import apiService from "../serv/apiservice";

const Login = () => {
  const [newLogin, setNewLogin] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const loginForm = (e, username, password) => {
    e.preventDefault();
    const newUserInfo = {
      username: username,
      password: password
    };
    apiService.login(newUserInfo)
      .then(res => {
        window.localStorage.setItem("loggedWantAppUser", JSON.stringify(res));
        window.location.href = "/";
      }).catch(err => { window.alert("Wrong username or password"); });
  };

  const logMeIn = e => {
    loginForm(e, newLogin, newPassword);
    setNewLogin("");
    setNewPassword("");
  };

  return (
    <div className="item">
      <h4>Log In</h4>
      <form onSubmit={e => logMeIn(e)}>
        <input type="text" onChange={e => setNewLogin(e.target.value)} value={newLogin} autoFocus="autofocus" placeholder="Username" required />
        <br/>
        <input type="password" onChange={e => setNewPassword(e.target.value)} value={newPassword} placeholder="Password" required />
        <br/>
        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default Login;