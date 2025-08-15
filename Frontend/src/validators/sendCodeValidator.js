const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const sendCodeValidator = ({email}) => {
  let errors = {email: ""};
 

  if (!email) {
    errors.email = "Email is required";
  } else if (!isEmail(email)) {
    errors.email = "Email is invalid";
  }

  return errors;
};

export default sendCodeValidator;
