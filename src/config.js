require('dotenv').config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  wsPort: process.env.WS_PORT,
  saltFactor: parseInt(process.env.SALT_FACTOR, 10),
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
