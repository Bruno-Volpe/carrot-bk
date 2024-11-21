import { Router } from 'express'

import { generate } from '../controllers/IA'

const router = Router()

router.post('/generate', generate)

export default router 