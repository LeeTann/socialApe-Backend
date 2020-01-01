// Validation Helper Function
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) {
        return true
    } else {
        return false
    }
}
const isEmpty = (string) => {
    if(string.trim() === '') {
        return true
    } else {
        return false
    }
}

exports.validateSignupData = (data) => {
    // Checking for errors and empty input
    let errors = {}

    if(isEmpty(newUser.email)) {
        errors.email = 'Must not be empty'
    } else if(!isEmail(newUser.email)) {
        errors.email = 'Must be a valid email address'
    }

    if(isEmpty(newUser.password)) errors.password = 'Must not be empty'
    if(newUser.password !== newUser.confirmpassword) errors.confirmpassword = 'Password must match'
    if(isEmpty(newUser.handle)) errors.handle = 'Must not be empty'
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLoginData = (data) => {
    let errors = {}

    if(isEmpty(user.email)) errors.email = "Must not be empty"
    if(isEmpty(user.password)) errors.password = "Must not be empty"
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}