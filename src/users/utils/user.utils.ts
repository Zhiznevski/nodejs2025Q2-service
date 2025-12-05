import { UserResponseDto } from '../dto/user-response.dto';
import { User } from '../user.entity';

export const mapUserToUserResponseDto = (user: User): UserResponseDto => ({
  id: user.id,
  login: user.login,
  version: user.version,
  createdAt: user.createdAt.getTime(),
  updatedAt: user.updatedAt.getTime(),
});
