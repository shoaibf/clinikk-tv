import controller from './../controllers'
import { Router } from 'express'

const router: Router = Router()
router.post('/login', controller.auth.login)

const Auth: Router = router

export default Auth