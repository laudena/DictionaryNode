const axiosLib = require("axios");
const fs = require("fs");

const DICTIONARY_NODE_ID = process.env.DICTIONARY_NODE_ID || fs.readFileSync('../.dictionary', 'utf8')

const baseURL = ''; //set heap or monitoring service here
const axios = axiosLib.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

async function sendEvent(event, metadata) {

  // if (DICTIONARY_NODE_ID !== '') {
  //   const result = await axios.post(`/nodes/${DICTIONARY_NODE_ID}/event`, JSON.stringify({event, metadata}));
  //   return result.data;
  // }
  return null;
}

module.exports = {
  sendEvent,
}
