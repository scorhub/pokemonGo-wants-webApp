import axios from 'axios';
const apiURI = '/api';
const logURI = '/api/login';
const verifiedURI = '/api/verified';
const pokeURI = `${verifiedURI}/pokemons`;
const userURI = `${verifiedURI}/users`;
const wantsURI = `${verifiedURI}/wants`;
const seedURI = `${verifiedURI}/seeds`;
const featureURI = `${verifiedURI}/newfeature`;
const myWantsURI = `${verifiedURI}/mywants`;

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const login = async credentials => {
  const res = await axios.post(`${logURI}`, credentials);
  return res.data;
};

const getPokemonCount = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${pokeURI}/count`, config);
  return res.data
};

const addData = async credentials => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(`${pokeURI}`, credentials, config);
  return res.data
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
  } else { return null; };
  return res.data;
};

const getPokemonSeeds = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${seedURI}/pokemons`, config);
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
    res = await axios.get(`${seedURI}/arean`, config);
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

export default { setToken, login, getPokemonCount, addData, wantGetter, changeWant, getPokemonSeeds, wantSeedGetter, getFeatures, askFeature, others, otherWantGetter, myWantGetter, changePass };