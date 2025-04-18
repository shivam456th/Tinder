const validator = require('validator');

const validationSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Name is Not Valid!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a Strong password!");
    }
};

module.exports = {
    validationSignUpData
};
