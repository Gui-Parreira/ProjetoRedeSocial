// Powered by Gui Parreira

import Sequelize from 'sequelize';
import sequelize from "./db.js";

//Exemplo de Modelo
const Postagem = sequelize.define('postagem', {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    conteudo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    usuario: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    visivel: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    }
  });  
  
  sequelize.sync();

  export default Postagem