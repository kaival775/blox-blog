const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const changePasswordValidator = ( formData ) => {
  console.log(formData);
  let errors = {  oldPassword: "", newPassword: "" };

  if (!formData.oldPassword) {
    errors.oldPassword = "Password is required";
  } 

  if (!formData.newPassword) {
    errors.confirmPassword = "Password is required";
  } else if (formData.newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  }

  
  if (formData.oldPassword && formData.oldPassword === formData.newPassword) {
    errors.newPassword = "You are providing old password";
  }

  return errors;
};

export default changePasswordValidator;
