require('dotenv').config();

export default {
  env: process.env.NODE_ENV || 'production',
  port: process.env.PORT || 8080,
  wsPort: process.env.WS_PORT || 65080,
  saltFactor: parseInt(process.env.SALT_FACTOR, 10) || 12,
  jwtSecret: process.env.JWT_SECRET || 'AASDzxckui2340zaslxoc',
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || 'ASD@ORQE$#@K$XCV213490890cnz0',
  jwtForgotPasswordSecret:
    process.env.JWT_FORGOT_PASSWORD_SECRET || 'ASD@#%$DFGBDFT@#$21431312',
  swEmail: process.env.SW_EMAIL_ADDRESS || 'sunway.official@gmail.com',
  mailstrap: {
    host: process.env.MT_HOST || 'smtp.mailtrap.io',
    port: process.env.MT_PORT || 2525,
    auth: {
      user: process.env.MT_USER || '9d2474d564b87b',
      pass: process.env.MT_PASS || '1831d861177f69',
    },
  },
  resetPasswordClientRoute:
    `${process.env.CLIENT_ADDRESS}/${process.env.RESET_PASSWORD_ROUTE}` ||
    'http://acm-dtu-admin.appspot.com/resetPassword',
};
