import * as Yup from "yup"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

export const signInValidation = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string().required("Password is required to sign in"),
})

export const signUpValidation = Yup.object({
  name: Yup.string()
    .max(40, "Must be 40 characters or less")
    .required("Required"),
  email: Yup.string()
    .max(40, "Must be 40 characters or less")
    .email("Invalid email address")
    .required("Required"),
  password: Yup.string().required("Required").matches(passwordRegExp, "Password should contain at least one uppercase letter, one lowercase letter and one number"),
  phoneNumber: Yup.string().required("Required")
    .max(15, "Phone number should be 15 characters or less")
    .matches(phoneRegExp, "Phone number is not valid")
});
