import * as yup from "yup";

const loginSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Can't be empty"),
    password: yup.string().required("Can't be empty")
});

//const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const signupSchema = yup.object().shape({
    email: yup.string().email("Email is invalid").required("Can't be empty"),
    // password: yup.string().min(8, 'At least 8 characters').matches(passwordRules, { message: "Please create a stronger password" }).required("Can't be empty"),
    password: yup.string().min(8, 'At least 8 characters').required("Can't be empty"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Can't be empty"),
});

// const linkSchema = yup.object().shape({
//   link: yup.string().required("Ct be empty"),
// });

const linkSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      link: yup
        .string()
        .url('Invalid URL')
        .required('Link is required'),
    })
  ),
});

const profileDetailsSchema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Can't be empty"),
  firstName: yup.string().required("Can't be empty"),
  lastName: yup.string().required("Can't be empty"),
});

const schemas = {
  loginSchema,
  signupSchema,
  linkSchema,
  profileDetailsSchema
};

export default schemas;
