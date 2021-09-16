import * as Yup from "yup";

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passwordRegExp = /^.{6,}$/;

export const signUpValidation = Yup.object({
  name: Yup.string().max(40, "Must be 40 characters or less"),
  // .required("Required"),
  password: Yup.string().matches(
    passwordRegExp,
    "Password should contain at least 6 characters"
  ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
