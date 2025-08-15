const isEmail=(email)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const signupValidator = ({formData}) => {
    console.log(formData)
    let errors={name:"",email:"",password:"",confirmPassword:""}
    if(!formData.name){
        errors.name="Name is required"
    }
    
    if(!formData.email){
        errors.email="Email is required"
    }
    else if(!isEmail(formData.email)){
        errors.email="Email is invalid"
    }

    if(!formData.password){
        errors.password="Password is required"
    }
    else if(formData.password.length<6){
        errors.password="Password must be at least 6 characters"
    }
    
    if(formData.password!==formData.confirmPassword){
        errors.confirmPassword="Passwords do not match"
    }
    return errors
 
}

export default signupValidator
