export const jwtConstants = {
  jwtAccessSecretKey: process.env.JWT_SECRET_KEY,
  jwtRefreshSecretKey: process.env.JWT_SECRET_REFRESH_KEY,
  accessTokenExpireTime: process.env.TOKEN_EXPIRE_TIME,
  refreshTokenExpireTime: process.env.TOKEN_REFRESH_EXPIRE_TIME,
};
