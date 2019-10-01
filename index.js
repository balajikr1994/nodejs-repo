"use strict";

import express from "express";
import http from "http";
import expressConfig from "./config/express";
import routerConfig from "./routes";
import mongoose from "mongoose";
import config from "./config/environment";
const app = express();
const server = http.createServer(app);
const multipart = require('connect-multiparty');
const log = require("./libs/log")(module);

app.get("/", (req, res) => {
  res.send("API Loading....");
});

mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on("error", err => {
  log.error("MongoDB Connection Error" + err);
  process.exit(-1);
});

app.use(multipart({
  uploadDir: config.tmp
}));

expressConfig(app);
routerConfig(app);

function startServer() {
  app.server = server.listen(config.port, config.ip, () => {
    log.info("Express server listening on " + config.port);
  });
}

setImmediate(startServer);
