import controller from './../controllers'
import validate from './../utilities/validate'
import validators from './../validators'
import { Router } from 'express'
import * as passportConfig from "../config/passport";
import * as role from "../config/admin"


const router: Router = Router()
router.get("/list", controller.service.listServices);
router.post("/create", validate(validators.service.create),passportConfig.isAuthenticated, role.isAdmin, controller.service.createService);

const Service: Router = router

export default Service