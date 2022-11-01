import superagentPromise from "superagent-promise";
import _superagent from "superagent";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT =
  process.env.REACT_APP_NODE_ENV !== "production"
    ? "http://localhost:3000/api"
    : process.env.REACT_APP_BACKEND_URL
    ? process.env.REACT_APP_BACKEND_URL + "/api"
    : "https://ad-publishers-dictionary-api.herokuapp.com/api";

const encode = encodeURIComponent;
const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set("authorization", `Token ${token}`);
  }
};

const requests = {
  del: (url) =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .then(responseBody),
};

const Auth = {
  current: () => requests.get("/user"),
  login: (email, password) =>
    requests.post("/users/login", { user: { email, password } }),
  register: (username, email, password) =>
    requests.post("/users", { user: { username, email, password } }),
  save: (user) => requests.put("/user", { user }),
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (word) => Object.assign({}, word, { slug: undefined });
const Words = {
  all: (page) => requests.get(`/words?${limit(21, page)}`),
  bySearch: (search, page) =>
    requests.get(`/words?search=${encode(search)}&${limit(20, page)}`),
  del: (slug) => requests.del(`/words/${slug}`),
  feed: () => requests.get("/words/feed?limit=10&offset=0"),
  get: (slug) => requests.get(`/words/${slug}`),
  update: (word) =>
    requests.put(`/words/${word.slug}`, { word: omitSlug(word) }),
  create: (word) => requests.post("/words", { word }),
};

const agentObj = {
  Words,
  Auth,
  setToken: (_token) => {
    token = _token;
  },
};

export default agentObj;
