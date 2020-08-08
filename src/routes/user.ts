import controller from './../controllers'
import validate from './../utilities/validate'
import validators from './../validators'
import { Router } from 'express'

const router: Router = Router()
router.get('/users', controller.user.fetch)
router.post('/user', validate(validators.user.create), controller.user.create)

const User: Router = router

export default User