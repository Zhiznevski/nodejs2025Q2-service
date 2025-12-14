import {
  BadRequestException,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/utils/bcrypt';
import { mapUserToUserResponseDto } from 'src/users/utils/user.utils';
import { SignInResponseDto } from './dto/auth.dto';
import { jwtConstants } from './constants';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async _getTokens(userId: string, login: string) {
    const payload = { sub: userId, username: login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.accessTokenExpireTime,
        secret: jwtConstants.jwtAccessSecretKey,
      }),
      this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.refreshTokenExpireTime,
        secret: jwtConstants.jwtRefreshSecretKey,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findByLogin(login);
    if (user && (await checkPassword(pass, user.password))) {
      return mapUserToUserResponseDto(user);
    }
    return null;
  }

  async signIn(user: UserResponseDto): Promise<SignInResponseDto> {
    return this._getTokens(user.id, user.login);
  }

  async signUp(login: string, pass: string) {
    const userExists = await this.usersService.findByLogin(login);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.usersService.create({ login, password: pass });
    return { id: user.id, login: user.login };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.jwtRefreshSecretKey,
      });
      const userId = payload.sub;
      const login = payload.username;
      return this._getTokens(userId, login);
    } catch (e) {
      throw new ForbiddenException('Refresh token is invalid or expired');
    }
  }
}
