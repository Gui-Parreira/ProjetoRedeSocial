// Powered by Gui Parreira

import Sequelize from 'sequelize';
import sequelize from "./db.js";

//Exemplo de Modelo
const Like = sequelize.define('like', {
    usuario: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postagem: {
      type: Sequelize.STRING,
      allowNull: false
    },
    like: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  });  
  
  sequelize.sync();

  export default Like