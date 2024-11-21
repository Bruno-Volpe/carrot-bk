import { Router } from 'express'

import { store, show, update } from '../controllers/Info'

const router = Router()

router.post('/store', store)
router.get('/', show)
router.put('/update', update)

export default router 