import Sequelize, { Model } from 'sequelize';

export default class Infos extends Model {
  static init(sequelize) {
    super.init(
      {
        weight: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O peso não pode ser vazio',
            },
            isNumeric: {
              msg: 'O peso deve ser um número válido',
            },
          },
        },
        height: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'A altura não pode ser vazia',
            },
            isNumeric: {
              msg: 'A altura deve ser um número válido',
            },
          },
        },
        age: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'A idade não pode ser vazia',
            },
            isInt: {
              msg: 'A idade deve ser um número inteiro válido',
            },
          },
        },
        goal: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O objetivo não pode ser vazio',
            },
          },
        },
        calories: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O valor das calorias não pode ser vazio',
            },
          },
        },
        gender: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O gênero não pode ser vazio',
            },
            isIn: {
              args: [['Masculino', 'Feminino']],
              msg: 'O gênero deve ser Masculino ou Feminino',
            },
          },
        },
        activityLevel: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O nível de atividade não pode ser vazio',
            },
          },
        },
        training: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'A informação sobre treino não pode ser vazia',
            },
          },
        },
        mealTimes: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Os horários das refeições não podem ser vazios',
            },
            is: {
              args: /^\d{2}:\d{2}(\s*,\s*\d{2}:\d{2})*$/,
              msg: 'Os horários das refeições devem estar no formato HH:MM, separados por vírgulas',
            },
          },
        },
        chocolate: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'A preferência de chocolate não pode ser vazia',
            },
          },
        },

        // Meal fields (stored as JSON arrays)
        breakfast: {
          type: Sequelize.JSONB,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O café da manhã não pode ser vazio',
            },
            isArrayOfStrings(value) {
              if (!Array.isArray(value)) {
                throw new Error('O café da manhã deve ser um array de strings');
              }
            },
          },
        },
        lunch: {
          type: Sequelize.JSONB,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O almoço não pode ser vazio',
            },
            isArrayOfStrings(value) {
              if (!Array.isArray(value)) {
                throw new Error('O almoço deve ser um array de strings');
              }
            },
          },
        },
        snacks: {
          type: Sequelize.JSONB,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'Os lanches não podem ser vazios',
            },
            isArrayOfStrings(value) {
              if (!Array.isArray(value)) {
                throw new Error('Os lanches devem ser um array de strings');
              }
            },
          },
        },
        dinner: {
          type: Sequelize.JSONB,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: 'O jantar não pode ser vazio',
            },
            isArrayOfStrings(value) {
              if (!Array.isArray(value)) {
                throw new Error('O jantar deve ser um array de strings');
              }
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'infos',
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Users, { foreignKey: 'user_id' });
  }
}
