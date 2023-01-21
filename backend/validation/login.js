const isEmpty = require('./isEmpty')
const validator = require('validator')

const validateLoginInput = (data) =>{
    let errors = {}
    data.email     =    !isEmpty(data.email)?data.email:'';
    data.password  =    !isEmpty(data.password)?data.password:'';
    data.phone_number  =    !isEmpty(data.phone_number)?data.phone_number:'';
 if(validator.isEmpty(data.email)){
     errors.email = "Email field is required."
 }if(!validator.isEmail(data.email)){
    errors.email = "Valid email required"
 }if(validator.isEmpty(data.password)){
     errors.password = "Password is required."
 }if(!validator.isLength(data.password)){
     errors.password = "Password must be 6 characters long."
 }

 return{
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = validateLoginInput