import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; 

class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public number!: string;
  public email!: string;
  public display!: string;
  public info!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  display: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true, 
    },
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at', 
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at',
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user',
  underscored: true,
});

export { User };
