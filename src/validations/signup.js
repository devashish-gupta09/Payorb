import * as Yup from "yup"

export const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const signUpValidation = Yup.object({
  name: Yup.string()
    .max(40, "Must be 40 characters or less"),
  // .required("Required"),
  password: Yup.string().matches(passwordRegExp, "Password should contain at least one uppercase letter, one lowercase letter and one number"),
});
