const axiosLib = require("axios");
const fs = require("fs");

const DICTIONARY_NODE_ID = process.env.DICTIONARY_NODE_ID || fs.readFileSync('../.dictionary', 'utf8')

const baseURL = 'https://localhost/set_heap_here';
const axios = axiosLib.create({
  baseURL: baseURL,
  headers: {
    'Content-type': 'application/json',
  },
});

async function sendEvent(event, metadata) {
  const result = await axios.post(`/users/${DICTIONARY_NODE_ID}/event`, JSON.stringify({ event, metadata }));
  return result.data;
}

module.exports = {
  sendEvent,
}
