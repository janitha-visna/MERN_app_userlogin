import { Router } from "express";
const router = Router(); // Create a new instance of the Router class

/**import all contrllers */
import * as controller from '../controller/appController.js'
import Auth,{localVariables} from '../middleware/auth.js'
import { registerMail } from "../controller/mailer.js";

/**POST method */
router.route("/register").post(controller.register);
router.route("/registerMail").post(registerMail);//send the email
router.route("/authenticate").post((req,res) => res.end()); //authenticate user
router.route("/login").post(controller.verifyUser,controller.login) //login in app

/**GET method */

router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.verifyUser,localVariables,controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);

/**PUT method */
router.route("/updateuser").put(Auth,controller.updateuser);
router.route("/resetPassword").put(controller.verifyUser,controller.resetPassword);

export default router;
