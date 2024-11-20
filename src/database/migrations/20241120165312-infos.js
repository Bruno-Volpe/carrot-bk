'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('infos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      weight: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      height: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      goal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      calories: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activity_level: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      training: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      meal_times: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      chocolate: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      // Meal fields (storing meal items as JSON arrays)
      breakfast: {
        type: Sequelize.JSONB,  // JSONB allows you to store the array of items
        allowNull: false,
      },
      lunch: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      snacks: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      dinner: {
        type: Sequelize.JSONB,
        allowNull: false,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('infos');
  },
};
