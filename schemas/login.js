exports.login = {
    password: {
        exists: {
            errorMessage: "Password is required"
        },
        isString: {
            errorMessage: "Password should be a string"
        },
    },
    email: {
        normalizeEmail: true,
        exists: {
            errorMessage: "Email is required"
        },
    },
};