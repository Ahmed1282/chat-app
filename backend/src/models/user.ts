// src/models/user.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Adjust the path as necessary

class User extends Model {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public number!: string;
  public email!: string;
  public display!: string;
  public info?: string;
  public created_at!: Date; // Explicitly add created_at
  public updated_at!: Date; // Explicitly add updated_at
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
      isUrl: true, // Ensures that the value is a valid URL
    },
  },
  info: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at' // Map to created_at in the database
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'updated_at' // Map to updated_at in the database
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'user', // Specify the table name
  //timestamps: true, // Automatically adds `created_at` and `updated_at` fields
  underscored: true,
});

export { User };
