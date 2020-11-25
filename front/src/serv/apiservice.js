import axios from 'axios';
const apiURI = '/api';
const logURI = '/api/login';
const verifiedURI = '/api/verified';
const pokeURI = `${verifiedURI}/pokemons`;
const userURI = `${verifiedURI}/users`;
const wantURI = `${verifiedURI}/want`;
const seedURI = `${verifiedURI}/seeds`;
const featureURI = `${verifiedURI}/newfeature`;
const myWantsURI = `${verifiedURI}/mywants`;

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const login = async credentials => {
  const response = await axios.post(`${logURI}`, credentials);
  return response.data;
};

const getList = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${pokeURI}`, config);
  return res.data;
};

const addData = async credentials => {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(`${pokeURI}`, credentials, config);
    return response.data
};

const wantGetter = async type => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${wantURI}/`, config);
  } else if (type === "always") {
    res = await axios.get(`${wantURI}/always`, config);
  } else if (type === "arean") {
    res = await axios.get(`${wantURI}/areanwants`, config);
  } else { return null; };
  return res.data;
};

const changeWant = async (id, tempPokemon, type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.patch(`${wantURI}/${id}`, tempPokemon, config);
  } else if (type === "always") {
    res = await axios.patch(`${wantURI}/always/${id}`, tempPokemon, config);
  } else if (type === "arean") {
    res = await axios.patch(`${wantURI}/areanwants/${id}`, tempPokemon, config);
  } else { return null; };
  return res.data;
};

const wantSeedGetter = async (type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${seedURI}/wants`, config);
  } else if (type === "always") {
    res = await axios.get(`${seedURI}/always`, config);
  } else if (type === "arean") {
    res = await axios.get(`${seedURI}/areanwants`, config);
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
    const response = await axios.post(`${featureURI}`, newAsk, config);
    return response.data
};

const others = async () => {
    const config = { headers: { Authorization: token } };
    const response = await axios.get(`${userURI}`, config);
    return response.data
};

const otherWantGetter = async (id, type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${userURI}/${id}`, config);
  } else if (type === "always") {
    res = await axios.get(`${userURI}/alwants/${id}`, config);
  } else if (type === "arean") {
    res = await axios.get(`${userURI}/areanwants/${id}`, config);
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
  } else { return null; };
  return res.data;
};

const changePass = async newpass => {
  const config = { headers: { Authorization: token } };
  const res = await axios.patch(`${apiURI}/password/change`, newpass, config);
  return res.data;
};

export default { setToken, login, getList, addData, wantGetter, changeWant, wantSeedGetter, getFeatures, askFeature, others, otherWantGetter, myWantGetter, changePass };