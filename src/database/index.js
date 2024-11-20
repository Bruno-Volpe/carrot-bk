import Sequileze from 'sequelize'
import databaseConfig from '../config/database'

import Users from '../models/Users'
import Infos from '../models/Infos'

const models = [Users, Infos]

const connection = new Sequileze(databaseConfig)

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

export default connection;