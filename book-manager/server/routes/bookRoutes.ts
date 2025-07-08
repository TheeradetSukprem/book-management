import express from 'express'
import * as controller from '../controllers/bookController'

const router = express.Router()

router.get('/book', controller.getAll)
router.get('/book/:id', controller.getOne)
router.post('/book', controller.create)
router.put('/book/:id', controller.update)
router.delete('/book/:id', controller.remove)

export default router
