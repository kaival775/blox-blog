const emailValidator = (email) =>{
    const match = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    if(match) return true;
    else return false;
}

module.exports = emailValidator;