const route = require("express").Router();
const address = require("../models/addresses");

const jwtAuth = require("../auth/AuthToken");
const addresses = require("../models/addresses");
class RouterAddress {
  constructor() {
    this.routes = route;

    //rotas publicas
    this.publicRoutes();

    //todas as rotas abaixo desse middlewares precisam ser validar o Token
    this.middleware();
    //rotas protegidas
    this.privateRoutes();
  }

  middleware() {
    //colocar o AUTH..
    this.routes.use(jwtAuth.validarToken);
  }
  privateRoutes() {
    this.routes.post("/:id", address.Create);
    this.routes.get("/", address.FindAll);
    this.routes.get("/:id", address.FindAddressByIdUser);
    this.routes.patch("/:id", addresses.UpdateAddress);
    //or zipcode
    this.routes.delete("/:id", address.DeleteAddress);
  }
  publicRoutes() {
    //colocar rotas protegidas aqui
  }
}

//importando as rotas ja instaciadas.
module.exports = new RouterAddress().routes;
