const route = require("express").Router();
const user = require("../models/Users");

const jwt = require("../auth/AuthToken");

class RouterUser {
  constructor() {
    this.routes = route;
    //rotas publicas
    this.publicRoutes();
    //todas as rotas abaixo do middlware são rotas protegidas
    this.middleware();
    //rotas protegidas
    this.privateRoutes();
  }

  middleware() {
    //carregar os mddl aqui.
  }
  publicRoutes() {
    this.routes.post("/cadastro", user.Create);
    this.routes.post("/login", user.FindUser);
  }
  privateRoutes() {
    this.routes.delete("/", user.DeleteUser);
  }
}

module.exports = new RouterUser().routes;
