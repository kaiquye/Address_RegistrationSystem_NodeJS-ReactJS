//CRIO A CONEXAO COM O BANCO DE DADOS
//CHAMO OS MODEL (TABLES) E INICIO TODOS
//UNICA FORMA QUE CONSEGUIR FAZER RELACIONAMENTO
const Sequelize = require('sequelize')
const addresses = require('../models/addresses')
const users = require('../models/Users')
//apinodejs-130
const data = new Sequelize("apinodejs-1301", 'root', '1234', {
    host : 'localhost', 
    dialect : 'mysql'
})

//iniciando os model
addresses.init(data);
users.init(data)
//fazendo as associações
addresses.associate(data.models);
users.associate(data.models);


module.exports = data;