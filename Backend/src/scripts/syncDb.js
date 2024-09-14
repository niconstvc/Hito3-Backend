const sequelize = require('../config/connection');
const User = require('../models/user');

const syncDb = async () => {
  try {
    await sequelize.sync({ force: true }); 
     console.log('Base de datos sincronizada.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
};

syncDb();
