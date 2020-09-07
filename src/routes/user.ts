import controller from './../controllers'
import validate from './../utilities/validate'
import validators from './../validators'
import { Router } from 'express'
import * as passportConfig from "../config/passport";


const router: Router = Router()
router.post('/sendOtp', validate(validators.user.create), controller.user.sendOtp)
router.post('/signup', validate(validators.user.register), controller.user.verifySignup)
router.post('/login', controller.user.postLogin)
router.get("/test", passportConfig.isAuthenticated, controller.user.testRoute);
const User: Router = router

export default User