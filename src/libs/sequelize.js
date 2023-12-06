const {Sequelize} = require('sequelize');
const setUpModels = require('../../db/models');

const sequelize = new Sequelize('game_DB', 'postgres', '123', {
    host:'localhost',
    dialect:'postgres',
    logging:true,
    port:5432
});

setUpModels(sequelize);


//Sincronizar. OJO CON ENTORNOS PRODUCTIVOS
sequelize.sync()

  .then(() => {
    console.log('Sync successful');
  })
  .catch((error) => {
    console.error('Sync failed:', error);
  });

module.exports = sequelize;