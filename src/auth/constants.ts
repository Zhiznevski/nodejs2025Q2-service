export const jwtConstants = {
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtRefreshSecretKey: process.env.JWT_SECRET_REFRESH_KEY,
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME,
};
