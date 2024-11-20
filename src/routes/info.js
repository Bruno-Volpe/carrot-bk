import { Router } from 'express'

import { store } from '../controllers/Info'

const router = Router()

router.post('/store', store)

export default router 