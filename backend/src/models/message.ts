// src/models/message.ts
import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/db'; 
import { User } from './user';
import { Chat } from './chat'; // Ensure Chat model is imported

interface MessageAttributes {
  id?: number;
  sender_id: number;
  chat_id: number; // Add chat_id here
  message_str: string;
  created_at?: Date;
  updated_at?: Date;
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  public id!: number;
  public sender_id!: number;
  public chat_id!: number; // Add chat_id here
  public message_str!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Message.init({
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
      model: 'chat', // This should match the table name of the Chat model
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  message_str: {
    type: DataTypes.TEXT,
    allowNull: false,
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
  modelName: 'Message',
  tableName: 'message',
  underscored: true,
});

Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(Chat, { foreignKey: 'chat_id', as: 'chat' }); // Define the relationship with Chat model

export { Message };
