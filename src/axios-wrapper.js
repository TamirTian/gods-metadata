const axios = require('axios');
const http = require('http');
const https = require('https');
const httpAgent = new http.Agent({ keepAlive: true });
const httpsAgent = new https.Agent({ keepAlive: true });

module.exports = axios.create({
  httpAgent,
  httpsAgent,
  headers: { 'content-type': 'application/json' },
  timeout: 120 * 1000
});

