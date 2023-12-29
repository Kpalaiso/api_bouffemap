const Joi = require('joi');

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_DAYS: Joi.number()
            .default(5)
            .description('days after which verify email expires'),
        MAILJET_API_KEY: Joi.string().description('the from field in the emails sent by the app'),
        MAILJET_API_SECRET: Joi.string().description('the from field in the emails sent by the app'),
        EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
        EMAIL_NAME: Joi.string().description('the from field in the emails sent by the app'),
        STATUS_REQUEST_SUCESS: Joi.string().description('the from field in the emails sent by the app'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mysql: {
        host: envVars.HOST,
        db_name: envVars.DB_NAME,
        db_user: envVars.DB_USER,
        db_pass: envVars.DB_PASS,
        dialect: envVars.DIALECT,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationDays: envVars.JWT_VERIFY_EMAIL_EXPIRATION_DAYS,
    },
    email: {
        mailJet: {
            apiKey: envVars.MAILJET_API_KEY,
            apiSecret: envVars.MAILJET_API_SECRET,
        },

        from: envVars.EMAIL_FROM,
        name: envVars.EMAIL_NAME,
    },
    statusRequestSucces: envVars.STATUS_REQUEST_SUCESS,
};