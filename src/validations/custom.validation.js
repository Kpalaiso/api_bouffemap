const parsePhoneNumber = require('libphonenumber-js');

const phoneNumber = (value, helpers) => {
  if (value == undefined || value == '') {
    return value;
  }
  const phoneNumber = parsePhoneNumber(value);
  if (!phoneNumber.isValid()) {
    return helpers.message('PhoneNumber is not valid');
  }
  return value;
};

module.exports = {
  phoneNumber,
};
