const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const signinValidator = ( formData ) => {
  console.log(formData);
  let errors = { email: "", password: "", confirmPassword: "" };

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!isEmail(formData.email)) {
    errors.email = "Email is invalid";
  }
  if (!formData.password) {
    errors.password = "Password is required";
  } 
  return errors;
};

export default signinValidator;
