require('dotenv').config();
const http = require('http');
const app = require('./app');
const port = process.env.SV_PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server is running!")
});