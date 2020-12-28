import axios from 'axios';
// const apiURI = '/api';
const logURI = '/api/login';
const verifiedURI = '/api/verified';

const userURI = `${verifiedURI}/users`;
const wantsURI = `${verifiedURI}/wants`;
const featureURI = `${verifiedURI}/features`;
const myWantsURI = `${verifiedURI}/mywants`;
const newsURI = `${verifiedURI}/news`;
const eventsURI = `${verifiedURI}/events`;

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const login = async credentials => {
  const res = await axios.post(`${logURI}`, credentials);
  return res.data;
};

const wantGetter = async type => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${wantsURI}/`, config);
  } else if (type === "always") {
    res = await axios.get(`${wantsURI}/always`, config);
  } else if (type === "arean") {
    res = await axios.get(`${wantsURI}/arean`, config);
  } else if (type === "variant") {
    res = await axios.get(`${wantsURI}/variant`, config);
  } else if (type === "costume") {
    res = await axios.get(`${wantsURI}/costume`, config);
  } else if (type === "shiny") {
    res = await axios.get(`${wantsURI}/shiny`, config);
  } else { return null; };
  return res.data;
};

const changeWant = async (id, tempPokemon, type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.patch(`${wantsURI}/${id}`, tempPokemon, config);
  } else if (type === "always") {
    res = await axios.patch(`${wantsURI}/always/${id}`, tempPokemon, config);
  } else if (type === "arean") {
    res = await axios.patch(`${wantsURI}/arean/${id}`, tempPokemon, config);
  } else if (type === "variant") {
    res = await axios.patch(`${wantsURI}/variant/${id}`, tempPokemon, config);
  } else if (type === "costume") {
    res = await axios.patch(`${wantsURI}/costume/${id}`, tempPokemon, config);
  } else if (type === "shiny") {
    res = await axios.patch(`${wantsURI}/shiny/${id}`, tempPokemon, config);
  } else { return null; };
  return res.data;
};

const getFeatures = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${featureURI}`, config);
  return res.data;
};

const askFeature = async newAsk => {
    const config = { headers: { Authorization: token } };
    const res = await axios.post(`${featureURI}`, newAsk, config);
    return res.data
};

const others = async () => {
    const config = { headers: { Authorization: token } };
    const res = await axios.get(`${userURI}`, config);
    return res.data
};

const otherWantGetter = async (id, type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${userURI}/${id}`, config);
  } else if (type === "always") {
    res = await axios.get(`${userURI}/always/${id}`, config);
  } else if (type === "arean") {
    res = await axios.get(`${userURI}/arean/${id}`, config);
  } else if (type === "variant") {
    res = await axios.get(`${userURI}/variant/${id}`, config);
  } else if (type === "costume") {
    res = await axios.get(`${userURI}/costume/${id}`, config);
  } else if (type === "shiny") {
    res = await axios.get(`${userURI}/shiny/${id}`, config);
  } else { return null; };
  return res.data;
};

const myWantGetter = async type => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${myWantsURI}/lucky`, config);
  } else if (type === "always") {
    res = await axios.get(`${myWantsURI}/always`, config);
  } else if (type === "arean") {
    res = await axios.get(`${myWantsURI}/arean`, config);
  } else if (type === "variant") {
    res = await axios.get(`${myWantsURI}/variant`, config);
  } else if (type === "costume") {
    res = await axios.get(`${myWantsURI}/costume`, config);
  } else if (type === "shiny") {
    res = await axios.get(`${myWantsURI}/shiny`, config);
  } else { return null; };
  return res.data;
};

const changePass = async newpass => {
  const config = { headers: { Authorization: token } };
  const res = await axios.patch(`${verifiedURI}/password/change`, newpass, config);
  return res.data;
};

const getFrontFeed = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${verifiedURI}/front`, config);
  return res.data
};

const getNews = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${newsURI}/`, config);
  return res.data;
};

const getEvents = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${eventsURI}/`, config);
  return res.data;
};

export default { setToken, login, wantGetter, changeWant, getFeatures, askFeature, others, otherWantGetter, myWantGetter, changePass, getFrontFeed, getNews, getEvents };