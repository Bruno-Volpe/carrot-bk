import { storeObject, showObject, removeObject, updateObject } from '../utils/crud'
import errorM from '../utils/errorM'

import Customers from '../models/Infos'

const store = (req, res) => {
  console.log(req.body)
  storeObject(req, res, Customers)
}

export {
  store
}