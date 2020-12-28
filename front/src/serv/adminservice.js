import axios from 'axios';
const adminURI = '/api/verified/admin';

const pokeURI = `${adminURI}/pokemons`;
const seedURI = `${adminURI}/seeds`;
const addDataURI = `${adminURI}/adddata`;
const updDataURI = `${adminURI}/upddata`;
const manageModURI = `${adminURI}/moderator`;
const adminNewsURI = `${adminURI}/news`;
const adminEventsURI = `${adminURI}/events`;

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
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
  } else if (type === "variant") {
    res = await axios.post(`${pokeURI}/variant`, data, config);
  } else if (type === "costume") {
    res = await axios.post(`${pokeURI}/costume`, data, config);
  } else if (type === "shiny") {
    res = await axios.post(`${pokeURI}/shiny`, data, config);
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
  } else if (type === "variant") {
    res = await axios.get(`${seedURI}/pokemons/variant`, config);
  } else if (type === "costume") {
    res = await axios.get(`${seedURI}/pokemons/costume`, config);
  } else if (type === "shiny") {
    res = await axios.get(`${seedURI}/pokemons/shiny`, config);
  } else if (type === "gender") {
    res = await axios.get(`${seedURI}/pokemons/gender`, config);
  } else { return null; };
  return res.data;
};

const wantSeedGetter = async (type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "lucky") {
    res = await axios.get(`${seedURI}/wants/lucky`, config);
  } else if (type === "always") {
    res = await axios.get(`${seedURI}/wants/always`, config);
  } else if (type === "arean") {
    res = await axios.get(`${seedURI}/wants/arean`, config);
  } else if (type === "variant") {
    res = await axios.get(`${seedURI}/wants/variant`, config);
  } else if (type === "costume") {
    res = await axios.get(`${seedURI}/wants/costume`, config);
  } else if (type === "shiny") {
    res = await axios.get(`${seedURI}/wants/shiny`, config);
  } else if (type === "gender") {
    res = await axios.get(`${seedURI}/wants/gender`, config);
  } else { return null; };
  return res.data;
};

const otherDataSeeds = async (type) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "features") {
    res = await axios.get(`${seedURI}/features`, config);
  } else if (type === "events") {
    res = await axios.get(`${seedURI}/events`, config);
  } else if (type === "eventmons") {
    res = await axios.get(`${seedURI}/eventmons`, config);
  } else if (type === "news") {
    res = await axios.get(`${seedURI}/news`, config);
  } else { return null; };
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
  } else if (type === "mega") {
    res = await axios.get(`${addDataURI}/mega/list`, config);
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
  } else if (type === "mega") {
    res = await axios.patch(`${addDataURI}/mega/${id}`, status, config);
  } else { return null; };
  return res.data;
};

const getModData = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${manageModURI}`, config);
  return res.data
};

const patchModData = async (id, data) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.patch(`${manageModURI}/${id}`, data, config);
  return res.data
};

const getUpdData = async (type, type2, fdate) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "normal") {
    if (type2 === "image"){
      res = await axios.get(`${updDataURI}/normal/image/${fdate}`, config);
    } else { return null; };
  // } else if (type === "generation") {
  //   res = await axios.get(`${updDataURI}/generation/list`, config);
  // } else if (type === "rarity") {
  //   res = await axios.get(`${updDataURI}/rarity/list`, config);
  // } else if (type === "released") {
  //   res = await axios.get(`${updDataURI}/released/list`, config);
  // } else if (type === "mega") {
  //   res = await axios.get(`${updDataURI}/mega/list`, config);
  } else { return null; };
  return res.data;
};

const patchUpdData = async (id, status, type, type2) => {
  const config = { headers: { Authorization: token } };
  let res = null;
  if (type === "normal") {
    if (type2 === "image"){
      res = await axios.patch(`${updDataURI}/normal/image/${id}`, status, config);
    } else { return null; };
  // } else if (type === "generation") {
  //   res = await axios.patch(`${addDataURI}/generation/${id}`, status, config);
  // } else if (type === "rarity") {
  //   res = await axios.patch(`${addDataURI}/rarity/${id}`, status, config);
  // } else if (type === "released") {
  //   res = await axios.patch(`${addDataURI}/released/${id}`, status, config);
  // } else if (type === "mega") {
  //   res = await axios.patch(`${addDataURI}/mega/${id}`, status, config);
  } else { return null; };
  return res.data;
};

const postNews = async data => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(`${adminNewsURI}/`, data, config);
  return res.data;
};

const patchNews = async (id, data) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.patch(`${adminNewsURI}/${id}`, data, config);
  return res.data;
};

const getArchivedNews = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${adminNewsURI}/archived`, config);
  return res.data;
};

const postEvent = async data => {
  const config = { headers: { Authorization: token } };
  const res = await axios.post(`${adminEventsURI}/`, data, config);
  return res.data;
};

const patchEvents = async (id, data) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.patch(`${adminEventsURI}/${id}`, data, config);
  return res.data;
};

const getPastEvents = async () => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${adminEventsURI}/past`, config);
  return res.data;
};

const patchFeature = async (id, data) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.patch(`${adminURI}/features/${id}`, data, config);
  return res.data;
};

const getArchivedFeats = async (id, data) => {
  const config = { headers: { Authorization: token } };
  const res = await axios.get(`${adminURI}/features/archived`, config);
  return res.data;
};

export default { setToken, getPokemonCount, addPokemon, getPokemonSeeds, wantSeedGetter, otherDataSeeds, getAddData, patchAddData, getModData, patchModData, getUpdData, patchUpdData, postNews, patchNews, getArchivedNews, postEvent, patchEvents, getPastEvents, patchFeature, getArchivedFeats };