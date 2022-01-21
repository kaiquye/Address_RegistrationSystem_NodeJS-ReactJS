const { Model, DataTypes } = require("sequelize");
const Users = require("./Users");

const jwtAuth = require("../auth/AuthToken");

class addresses extends Model {
  //dentro deste metodo 'init' e carregado o metodo 'init' da superclass, passando a conexao do banco de dados como parametro..
  //este metodo init devera ser o primeiro a ser chamado....
  static init(sequelize) {
    //o id e criado automaticamento pelo sequelize.
    super.init(
      {
        zipcode: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        number: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { timestamps: false, sequelize, modelName: "addresses" } //o modelName deve ser no plura.
    );
  }
  //associate : relacionamento entre as tabelas
  static associate(models) {
    //belongsTo : um endereço pertence a um unico usuario (os endereços podem se repetir para varios usuarios)
    this.belongsTo(models.users, { foreignKey: "user_id" });
  }

  static async Create(req, res) {
    let user_id = req.params.id;
    //enviar o user_id pelo body
    let { zipcode, street, number } = req.body;
    console.log(user_id)
    //nucando o usuario pelo ID
    const cheackUser = await Users.findByPk(user_id);
    //verificando se esse usuario existe.
    if (!cheackUser) {
      return res.json({
        msg: "erro-address, não foi possivel encontra esse usuario id : ",
        user_id,
      });
    }
    try {
      //criando o address com o ID do usuario.
      let resultCreate = await addresses.create({
        zipcode,
        street,
        number,
        user_id: user_id,
      });
      return res
        .status(200)
        .json({status : 200,  msg: "address criado...", address: resultCreate });
    } catch (error) {
      console.log("erro ao criar o address" + error);
    }
  }
  //buscando todos address que estão relacionado (include) com o usuario

  //   static async FindAddressByIdUser(req, res) {
  //   let token = req.body.token;
  //   console.log("-----------------");
  //   console.log(req.body);
  //   let { user_id } = req.body;
  //   console.log(user_id);
  //   try {
  //     let resultFind = await Users.findByPk(user_id, { include: [addresses] });
  //     res
  //       .status(200)
  //       .json({
  //         msg: "include : buscando todos os enderecos do usuario",
  //         user: resultFind.fistName,
  //         result: resultFind.addresses,
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  static async FindAddressByIdUser(req, res) {
    let idUser = req.params.id;
    try {
      if (!idUser) {
        return res.status(401).json({ erro: "Erro ao buscar um adrres" });
      }
      let result = await Users.findByPk(idUser, { include: [addresses] });
      res
        .status(200)
        .json({
          msg: "include : buscando os address e user",
          id: result.user_id,
          fistName: result.fistName,
          result: result.addresses,
        });
    } catch (error) {
      console.log(error);
    }
  }

  static async FindAll(req, res) {
    try {
      let result = await addresses.findAll();
      res.status(200).json({ msg: result });
    } catch (error) {
      console.log(error);
    }
  }
  // static async DeleteAddress(req,res){
  //     let {zipcode, user_id} = req.body;
  //     try {
  //        let checkAddress =  await addresses.findOne({where : {zipcode : zipcode}})
  //        if(!checkAddress){
  //          return res.status(401).json({msg : 'erro, nenhum zipcode encontrado'})
  //        }

  //        let rs = await addresses.destroy({where : {zipcode : zipcode, user_id : user_id}})
  //        res.status(200).json({msg : 'addres apagado'})
  //       } catch (error) {
  //           console.log(error)
  //     }
  // }

  static async DeleteAddress(req, res) {
    let idAddres = req.params.id;
    try {
      //passar para o middl
      if (!idAddres) {
        return res.status(401).json({ erro: "erro, nenhum addres encontrado" });
      }
      let result = await addresses.destroy({ where: { id: idAddres } });
      if(result == 0){
      return res.status(401).json({status : 403, msg : 'Erro, nâo foi encontrado nenhum address com esse id'});  
      }
      res.status(200).json({status : 200, msg : 'Address apagado.'})
    } catch (error) {
      console.log(error);
      res.status(400).json({ erro: "erro ao apagar um address" });
    }
  }

  static async UpdateAddress(req, res) {
    let id = req.params.id;
    let { zipcode, street, number } = req.body;
    try {
      let result = await addresses.update(
        { zipcode, street, number },
        { where: { id: id } }
      );
      if (!result || result == 0) {
        res.status(400).json({ erro: "erro, nenhum address atualizado" });
      }
      res.status(200).json({ msg: "update addres", result });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = addresses;
