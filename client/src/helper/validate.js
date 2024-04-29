import toast from "react-hot-toast";
import { authenticate } from "./helper";

/**validate login page username */

export async function usernameValidate(values) {
  const errors = usernameVerify(values);
  if (values.username) {
    //check user exist or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("user does not exist");
    }
  }

  return errors;
}

/** valitde username */

function usernameVerify(values) {
  const errors = {};

  if (!values.username) {
    errors.username = "Username is required.";
  } else if (values.username.includes(" ")) {
    errors.username = "Username cannot contain spaces.";
  }

  return errors;
}

/**validate password */
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

/**validate password */
function passwordVerify(errors = {}, values) {
  const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (!values.password) {
    errors.password = toast.error("password required..!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("wrong password !!");
  } else if (values.password.length < 4) {
    errors.password = toast.error("password must be more that 4 charters");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("password must have specila charaters");
  }
  return errors;
}

/**valitade rest password */

export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("password not match");
  }

  return errors;
}

/**validate register form */
export async function registerValidation(values) {
  const errors = {};

  // Validate username
  const usernameErrors = usernameVerify(values);
  Object.assign(errors, usernameErrors);

  // Validate password
  const passwordErrors = passwordVerify({}, values);
  Object.assign(errors, passwordErrors);

  // Validate email
  const emailErrors = emailVerify(values);
  Object.assign(errors, emailErrors);

  return errors;
}


/**valiatade email */

function emailVerify(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email address.";
  }

  return errors;
}



/** validate profile page */

export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}
