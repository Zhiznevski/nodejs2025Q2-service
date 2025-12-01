import { User, UserResponse } from '../interfaces/user.interface';

export const mapUserToUserResponse = (user: User): UserResponse => ({
  id: user.id,
  login: user.login,
  version: user.version,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
