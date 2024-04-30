import { Router } from "express";
const router = Router(); // Create a new instance of the Router class

/**import all contrllers */
import * as controller from '../controller/appController.js'
import Auth,{localVariables} from '../middleware/auth.js'
import { registerMail } from "../controller/mailer.js";

/**POST method */
router.route("/register").post(controller.register);
router.route("/registerMail").post(registerMail);//send the email
router.route("/authenticate").post(controller.verifyUser,(req,res) => res.end()); //authenticate user
router.route("/login").post(controller.verifyUser,controller.login) //login in app

/**GET method */

router.route("/user/:username").get(controller.getUser);//user with username
router.route("/generateOTP").get(controller.verifyUser,localVariables,controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyUser,controller.verifyOTP);//verify generated OTP
router.route("/createResetSession").get(controller.createResetSession);//reset all the variables

/**PUT method */
router.route("/updateuser").put(Auth,controller.updateuser);//is use to update the user profile
router.route("/resetPassword").put(controller.verifyUser,controller.resetPassword);

export default router;
