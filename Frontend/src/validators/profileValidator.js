const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const signupValidator = ({ formData }) => {
  console.log(formData);
  let errors = { name: "", email: ""};
  if (!formData.name) {
    errors.name = "Name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!isEmail(formData.email)) {
    errors.email = "Email is invalid";
  }

  return errors;
};

export default signupValidator;
