import toast from "react-hot-toast";

/**validate login page username */
export async function usernameValidate(values){
    const errors = usernameVerify ({},values);
    
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
