import axios from 'axios';
// const apiURI = '/api';
const logURI = '/api/login';
const verifiedURI = '/api/verified';
const pokeURI = `${verifiedURI}/pokemons`;
const userURI = `${verifiedURI}/users`;
const wantsURI = `${verifiedURI}/wants`;
const seedURI = `${verifiedURI}/seeds`;
const featureURI = `${verifiedURI}/features`;
const myWantsURI = `${verifiedURI}/mywants`;
const addDataURI = `${verifiedURI}/adddata`;

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

const addPokemon = async (data, type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "normal") {
    res = await axios.post(`${pokeURI}`, data, config);
  } else if (type === "arean") {
    res = await axios.post(`${pokeURI}/arean`, data, config);
  } else if (type === "costume") {
    res = await axios.post(`${pokeURI}/costume`, data, config);
  } else if (type === "shiny") {
    res = await axios.post(`${pokeURI}/shiny`, data, config);
  } else { return null; };
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
  } else if (type === "costumes") {
    res = await axios.get(`${wantsURI}/costumes`, config);
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
  } else if (type === "costumes") {
    res = await axios.patch(`${wantsURI}/costumes/${id}`, tempPokemon, config);
  } else { return null; };
  return res.data;
};

const getPokemonSeeds = async (type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "normal") {
    res = await axios.get(`${seedURI}/pokemons`, config);
  } else if (type === "arean") {
    res = await axios.get(`${seedURI}/pokemons/arean`, config);
  } else if (type === "costumes") {
    res = await axios.get(`${seedURI}/pokemons/costumes`, config);
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
    res = await axios.get(`${seedURI}/arean`, config);
  } else if (type === "costumes") {
    res = await axios.get(`${seedURI}/costumes`, config);
  } else { return null; };
  return res.data;
};

const otherDataSeeds = async (type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "features") {
    res = await axios.get(`${seedURI}/features`, config);
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
  } else if (type === "costumes") {
    res = await axios.get(`${userURI}/costumes/${id}`, config);
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
  const res = await axios.patch(`${verifiedURI}/password/change`, newpass, config);
  return res.data;
};

const getAddData = async type => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "type") {
    res = await axios.get(`${addDataURI}/type/list`, config);
  } else if (type === "generation") {
    res = await axios.get(`${addDataURI}/generation/list`, config);
  } else if (type === "rarity") {
    res = await axios.get(`${addDataURI}/rarity/list`, config);
  } else if (type === "released") {
    res = await axios.get(`${addDataURI}/released/list`, config);
  } else { return null; };
  return res.data;
};

const patchAddData = async (id, status, type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "type") {
    res = await axios.patch(`${addDataURI}/type/${id}`, status, config);
  } else if (type === "generation") {
    res = await axios.patch(`${addDataURI}/generation/${id}`, status, config);
  } else if (type === "rarity") {
    res = await axios.patch(`${addDataURI}/rarity/${id}`, status, config);
  } else if (type === "released") {
    res = await axios.patch(`${addDataURI}/released/${id}`, status, config);
  } else { return null; };
  return res.data;
};

export default { setToken, login, getPokemonCount, addPokemon, wantGetter, changeWant, getPokemonSeeds, wantSeedGetter, otherDataSeeds, getFeatures, askFeature, others, otherWantGetter, myWantGetter, changePass, getAddData, patchAddData };