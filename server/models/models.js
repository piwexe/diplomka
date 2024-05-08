const sequelize = require('../db');
const { DataTypes, DATE } = require('sequelize');

const RawRoll = sequelize.define('RawRoll', {
  id: {
    type: 
    DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: { 
    type: 
    DataTypes.STRING, 
    allowNull: false 
  },
  startDate: { 
    type: DataTypes.DATE,
    allowNull: true 
  },
  endDate: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  status: { 
    type: DataTypes.STRING, 
    defaultValue: "не обрабатывается"
  },
  weight: { 
    type: 
    DataTypes.REAL, 
    
  },
}, {
  timestamps: false,
  tableName: 'RawRoll'
});

const Namotka = sequelize.define('Namotka', {
  id: {
    type: 
    DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  length: DataTypes.REAL,
  diameter: DataTypes.REAL,
  weight: DataTypes.REAL,
  time: DataTypes.DATE,
  validity: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  rawRollId: { 
    type: DataTypes.INTEGER,
    references: {
      model: RawRoll,
      key: 'id',
    },
  },
  number:DataTypes.INTEGER,
  initialWeight:DataTypes.REAL,
}, {
  timestamps: false,
  tableName: 'Namotka'
});

const User = sequelize.define('User',{
  id: {
    type: 
    DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  }, 
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: "USER"
  }
}, {
  timestamps: false,
  tableName: 'User'
});



RawRoll.hasMany(Namotka, { foreignKey: 'rawRollId', as: 'details' });
Namotka.belongsTo(RawRoll, { foreignKey: 'rawRollId', as: 'rawRoll' });

module.exports = {
  Namotka, 
  User,
  RawRoll
}
