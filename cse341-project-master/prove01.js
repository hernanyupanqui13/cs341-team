const http = require("http");

const routes = require("./prove01-routes");

const my_server = http.createServer(routes);


my_server.listen(3000); 