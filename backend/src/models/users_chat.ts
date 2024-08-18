import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db';
import { User } from './user';
import { Chat } from './chat'; // Ensure you have a Chat model defined similarly

interface UsersChatAttributes {
  id?: number;
  sender_id: number;
  chat_id: number;
  created_at?: Date;
  updated_at?: Date;
}

interface UsersChatCreationAttributes extends Optional<UsersChatAttributes, 'id'> {}

class UsersChat extends Model<UsersChatAttributes, UsersChatCreationAttributes> implements UsersChatAttributes {
  public id!: number;
  public sender_id!: number;
  public chat_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

UsersChat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'chat',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
  modelName: 'UsersChat',
  tableName: 'users_chat',
  underscored: true,
});

UsersChat.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
UsersChat.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' });

export { UsersChat };
