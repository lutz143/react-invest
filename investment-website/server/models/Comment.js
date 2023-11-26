// require the sequelize model and datatypes
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
// const dateFormat = require('../utils/dateFormat'); // Import utils for handling formatting of date

// create class Comment that extends off the required model
class Comment extends Model {}

Comment.init(
  {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      valuation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'valuation',
          key: 'id'
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
      },
      comment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;