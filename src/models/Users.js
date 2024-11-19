import Sequelize, { Model } from 'sequelize';

export default class Users extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 255],
            msg: 'A senha precisa ter entre 6 e 255 caracteres',
          },
        }
      },
    }, {
      sequelize,
    })

    return this;
  }
}