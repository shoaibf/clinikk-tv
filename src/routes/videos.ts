import controller from '../controllers'
import { Router } from 'express'
import * as passportConfig from "../config/passport";
import * as role from "../config/role"
import validate from './../utilities/validate'
import validators from './../validators'



const router: Router = Router()
router.get("/videos", passportConfig.isAuthenticated,controller.videos.browseVideos);
router.post("/upload",passportConfig.isAuthenticated, role.isCreator, controller.videos.uploadToServer);
router.post("/videos/:videoId",validate(validators.videos.video), role.isCreator,
passportConfig.isAuthenticated, controller.videos.updateVideo);
router.get("/videos/:videoId", passportConfig.isAuthenticated,controller.videos.showVideo);
router.post("/comment/:videoId",passportConfig.isAuthenticated, controller.videos.postComment);
router.get("/comment/:videoId", passportConfig.isAuthenticated,controller.videos.getComments);
router.post("/reply/:commentId",passportConfig.isAuthenticated, controller.videos.postReply);

const Videos: Router = router

export default Videos