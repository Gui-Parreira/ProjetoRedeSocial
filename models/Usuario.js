// Powered by Gui Parreira

import Sequelize from 'sequelize';
import sequelize from "./db.js";

//Exemplo de Modelo
const User = sequelize.define('usuario', {
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sobrenome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: Sequelize.STRING,
      allowNull: false      
    },
    nivelAcesso: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });  
  
  sequelize.sync();

  export default User