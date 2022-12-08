exports.registration = {
    id: {
        exists: {
            errorMessage: "Id is required"
        },
    },
    firstName: {
        exists: {
            errorMessage: "First Name is required",
            options: {
                checkFalsy: true
            },
        },
        isString: {
            errorMessage: "First Name should be a string"
        },
    },
    lastName: {
        exists: {
            errorMessage: "Last Name name is required",
            options: {
                checkFalsy: true
            },
        },
        isString: {
            errorMessage: "Last name should be a string"
        },
    },
    password: {
        exists: {
            errorMessage: "Password is required"
        },
        isString: {
            errorMessage: "Password should be a string"
        },
        isStrongPassword: {
            errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
        },
    },
    email: {
        isEmail:{
            
            errorMessage: "Please provide a valid email"
        },
        // normalizeEmail: true,
    },
};