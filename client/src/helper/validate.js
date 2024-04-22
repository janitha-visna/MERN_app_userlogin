import toast from "react-hot-toast";

/**validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

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

/** valitde username */

function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username required ...!");
  } else if (values.username.includes("")) {
    error.username = toast.error("invalid username..!");
  }

  return error;
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
  const errors = usernameVerify({}, values);
  passwordVerify(errors, values);
  emailVerify(errors,values);

  return errors;
}

/**valiatade email */

function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("email required..!");
  } else if (values.email.includes("")) {
    error.email = toast.error("wrong email");
  } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(values.email)) {
    error.email = toast.error("invalid email address");
  }
  return error;
}

/** validate profile page */

export async function profileValidation(values){
    const errors = emailVerify({},values);
    return errors;
}