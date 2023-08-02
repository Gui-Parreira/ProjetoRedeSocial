// Powered by Gui Parreira

import Sequelize from 'sequelize';

//Configuração do Sequilize
const sequelize = new Sequelize('dbexemplodsw', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });

export default sequelize  

