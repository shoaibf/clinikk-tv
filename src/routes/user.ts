import controller from './../controllers'
import validate from './../utilities/validate'
import validators from './../validators'
import { Router } from 'express'

const router: Router = Router()
router.get('/signup', controller.user.getSignup)
router.post('/sendOtp', validate(validators.user.create), controller.user.sendOtp)
router.post('/signup', validate(validators.user.register), controller.user.verifySignup)
router.get('/login', controller.user.getLogin)
router.post('/login', controller.user.postLogin)

const User: Router = router

export default User