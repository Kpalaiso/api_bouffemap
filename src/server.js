const http = require("http");
require("dotenv").config();
const app = require("./app");

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || "9000");
app.set("port", port);

const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error;
    }
    switch (error.code) {
        case "EACCES":
            process.exit(1);
            break;
        case "EADDRINUSE":
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on("error", errorHandler);
server.on("listening", () => {
//    const address = server.address();
//    const bind = typeof address === "string"?"pipe"+address : "port " + port;
//    console.log("Listening on 900 "); 
});

server.listen(port);