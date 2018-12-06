const port = Number(process.env.PORT || 5000);
const httpServer = require('http-server');
const server = httpServer.createServer({});
server.listen(port, '0.0.0.0', function() {
    console.log('Listening on port '+port+'. Hit CTRL-C to stop the server.');
});
