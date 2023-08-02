// Powered by Gui Parreira

import Sequelize from 'sequelize';
import sequelize from "./db.js";

//Exemplo de Modelo
const Comentario = sequelize.define('comentario', {
    usuario: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postagem: {
      type: Sequelize.STRING,
      allowNull: false
    },
    comentario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });  
  
  sequelize.sync();

  export default Comentario