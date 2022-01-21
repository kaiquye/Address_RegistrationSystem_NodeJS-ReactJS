const express = require("express");
const cors = require("cors");

require("./data/index");

const RouterAddress = require("../src/routers/RouterAddress");
const RouterUser = require("../src/routers/RoutersUser");

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.route();
  }
  middleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }
  route() {
    this.app.use("/address", RouterAddress);
    this.app.use("/user", RouterUser);
  }
}

module.exports = new App().app;
