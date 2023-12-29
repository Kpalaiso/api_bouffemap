const tokenTypes = {
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET_PASSWORD: 'resetPassword', // quand il nest pas connecté et qu'il veut reset son password
    VERIFY_EMAIL: 'verifyEmail',
    VERIFY_PHONE_NUMBER: 'verifyPhoneNumebr',
};

module.exports = {
    tokenTypes,
};

// refresh token et acces token aveec 2 durée de vie différente
//