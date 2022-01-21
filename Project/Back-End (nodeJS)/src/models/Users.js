const { Model, Sequelize } = require("sequelize");

const jwt = require("jsonwebtoken");

class Users extends Model {
  //metodo static, não preciso criar um construtor
  //sem construtor a class precisa ter os metodos static
  static init(sequelize) {
    super.init(
      {
        fistName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      { timestamps: false, sequelize, modelName: "users" }
    );
  }
  static associate(models) {
    this.hasMany(models.addresses, { foreignKey: "user_id" });
  }
  static async Create(req, res) {
    console.log(req.body.params)
    let { fistName, lastName, email, password } = req.body.params;

    try {
      let rsEmail = await Users.findOne({ where: { email: email } });

      if (rsEmail) {
        return res.json({ status : 403, 
          msg: "Erro : ja existe uma conta cadastrada com esse email",
        });
      }

      let resultCreate = await Users.create({
        fistName: fistName,
        lastName,
        email,
        password,
      });
      res.status(200).json({ msg: "created user : ", user: resultCreate });
      console.log(resultCreate);
    } catch (err) {
      res.status(401).json({status : 401, erro : err})
      console.log("erro", err);
    }
  }

  static async FindUser(req, res) {
    const { fistName, password } = req.body;

    try {
      let result = await Users.findOne({
        where: { fistName: fistName, password: password },
      });
      if (!result || result == null) {
        return res.status(200).json({ status : 401,  erro: "Usuario não encontrado" });
      }
      let id = result.id;
      const token = jwt.sign({ id }, "123", { expiresIn: 200 });
      res.status(200).json({ msg: "Token criado", Token: token, User : result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "erro ao gerar o token", error });
    }
  }
  static async DeleteUser(req, res) {
    const { fistName, email, password } = req.body;
    try {
      let rs = await Users.findOne({
        where: { email: email, password: password },
      });
      if (!rs) {
        return res.status(401).json({ msg: "Erro, nenhum usuario encontrado" });
      }
      let rsDel = await Users.destroy({ where: { email: email } });
      return res.status(200).json({ msg: "Usuario apagado " });
    } catch (error) {}
  }
  static async UpdateUser(req, res) {
    let { fistName, lastName, email, password } = req.body;
    try {
      let checkUser = await Users.findOne({ where: { email: email } });
      if (!checkUser) {
        return res.status(401).json({ msg: "Erro, nenhum usuario encontrado" });
      }
      let resultUser = await Users.update(
        { fistName, lastName, email, password },
        {
          where: {
            email: email,
          },
        }
      );
      res.status(200).json({ msg: "Usuario atualizado" });
    } catch (error) {
      console.log("Erro" + error);
      res.status(400).json({ msg: "Erro ao atualizar um usuario" });
    }
  }
}

module.exports = Users;
