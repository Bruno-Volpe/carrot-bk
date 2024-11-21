import { storeObject, } from '../utils/crud'
import errorM from '../utils/errorM'

import Customers from '../models/Infos'

const store = (req, res) => {
  storeObject(req, res, Customers)
}

const show = async (req, res) => {
  try {
    const id = req.body.user_id;
    if (!id) return res.status(401).json(errorM('ID nao enviado'));

    const modelObject = await Customers.findOne({ where: { user_id: id } });
    if (!modelObject) return res.status(404).json(errorM('User não encontrado'));
    res.status(200).json(modelObject);
  } catch (e) {
    res.status(400).json({
      errors: e.errors?.map((err) => err.message) || [{ message: e.message }],
    });
  }
}

const update = async (req, res) => {
  try {
    const id = req.body.user_id;
    if (!id) return res.status(401).json(errorM('ID nao enviado'));

    const oldModelObject = await Customers.findOne({ where: { user_id: id } });
    if (!oldModelObject) return res.status(404).json(errorM('User não encontrado'));

    const newModelObject = await oldModelObject.update(req.body);
    res.status(200).json(newModelObject);
  } catch (e) {
    res.status(400).json({
      errors: e.errors?.map((err) => err.message) || [{ message: e.message }],
    });
  }
}

export {
  store,
  show,
  update
}