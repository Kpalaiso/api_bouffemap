
const parsePhoneNumber = require('libphonenumber-js');

const phoneNumber = (value, helpers) => {
    const phoneNumber = parsePhoneNumber(value)
    if (!phoneNumber.isValid()) {
        return helpers.message('PhoneNumber is not valid');
    }
    return value;
};

module.exports = {
    phoneNumber,
};