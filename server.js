const http = require('http');
const app = require('./app');
const port = process.env.SV_PORT || 3002;
const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server is running!")
});