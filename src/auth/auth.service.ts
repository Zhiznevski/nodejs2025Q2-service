import { BadRequestException, Injectable } from '@nestjs/common';
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
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

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
    const user = await this.usersService.findByLogin(login); // What if logins are same?
    if (user && (await checkPassword(pass, user.password))) {
      return mapUserToUserResponseDto(user);
    }
    return null;
  }

  async signIn(user: UserResponseDto): Promise<SignInResponseDto> {
    const payload = { sub: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: jwtConstants.refreshTokenExpireTime,
        secret: jwtConstants.jwtRefreshSecretKey,
      }),
    };
  }

  async signUp(login: string, pass: string) {
    const userExists = await this.usersService.findByLogin(login);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const user = await this.usersService.create({ login, password: pass });
    return { id: user.id, login: user.login };
  }

  async refresh({ userId, login }: { userId: string, login: string }) {
    return this._getTokens(userId, login)
  }
}
