const sequelize = require('../config/database');
const User = require('./user');

sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Error syncing database:', err));

module.exports = { User };
