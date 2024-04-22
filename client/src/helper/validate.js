import toast from "react-hot-toast";

/**validate login page username */
export async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  return errors;
}

/**validate password */
export async function passwordValidate(values){
    const errors = passwordVerify({},values);
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
