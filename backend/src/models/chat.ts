import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; 

interface ChatAttributes {
  id?: number;
  sender_id: number;
  created_at?: Date;
  updated_at?: Date;
}

class Chat extends Model<ChatAttributes> implements ChatAttributes {
  public id!: number;
  public sender_id!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Chat.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user', // Refers to the 'user' table
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
  modelName: 'Chat',
  tableName: 'chat',
  underscored: true,
});

export { Chat };
