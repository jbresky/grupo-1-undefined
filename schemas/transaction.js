exports.createTransaction = {
    amount: {
        exists: {
            errorMessage: "Amount is required"
        },
        isDecimal: {
            errorMessage: "Amount should be a number"
        }
    },
    userId: {
        exists: {
            errorMessage: "User Id is required"
        },
    },
    categoryId: {
        exists: {
            errorMessage: "Category Id is required"
        },
    },
    date: {
        exists: {
            errorMessage: "Date is required"
        },
        isDate: {
            errorMessage: "Date should be a valid date time"
        }
    },
};

exports.editTransaction = {
    id: {
        exists: {
            errorMessage: "Id is required"
        },
    },
};