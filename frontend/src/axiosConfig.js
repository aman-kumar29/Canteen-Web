import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV !== 'production'?'http://127.0.0.1:5000/' : '/';