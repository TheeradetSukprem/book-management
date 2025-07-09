import express from 'express'
import * as controller from '../controllers/bookController'

const router = express.Router()

router.get('/books', controller.getAll)
router.get('/book/:id', controller.getOne)
router.post('/book', (req, res, next) => {
  Promise.resolve(controller.create(req, res)).catch(next)
})
router.put('/book/:id', controller.update)
router.delete('/book/:id', controller.remove)

export default router
