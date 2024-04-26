import { Router } from "express";
const router = Router(); // Create a new instance of the Router class

/**import all contrllers */
import * as controller from '../controller/appController.js'
import Auth from '../middleware/auth.js'

/**POST method */
router.route("/register").post(controller.register);

router.route("/authenticate").post((req,res) => res.end()); //authenticate user
router.route("/login").post(controller.verifyUser,controller.login) //login in app

/**GET method */

router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

/**PUT method */
router.route("/updateuser").put(Auth,controller.updateuser);
router.route("/resetPassword").put(controller.resetPassword);

export default router;
