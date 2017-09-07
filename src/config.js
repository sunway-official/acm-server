require('dotenv').config();

export default {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '8080',
  wsPort: process.env.WS_PORT || '65080',
  saltFactor: parseInt(process.env.SALT_FACTOR, 10) || 12,
  jwtSecret: process.env.JWT_SECRET || 'ThisIsTheJWTSecret',
  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET || 'ThisIsTheJWTRefreshTokenSecret',
  jwtForgotPasswordSecret:
    process.env.JWT_FORGOT_PASSWORD_SECRET || 'JWTFORGOTPASSWORD',
  swEmail: process.env.SW_EMAIL_ADDRESS || 'sunway.offical@gmail.com',
  mailstrap: {
    host: process.env.MT_HOST || 'smtp.mailtrap.io',
    port: process.env.MT_PORT || '2525',
    auth: {
      user: process.env.MT_USER || 'e35793f7d082b0',
      pass: process.env.MT_PASS || '8a2bce0c482b31',
    },
  },
  resetPasswordClientRoute:
    `${process.env.CLIENT_ADDRESS}/${process.env.RESET_PASSWORD_ROUTE}` ||
    'http://acm-dtu.appspot.com/auth/resetPassword',
};
