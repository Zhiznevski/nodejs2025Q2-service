import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByLogin(login);
    const isPasswordsMatch = await checkPassword(pass, user.password);
    if (!isPasswordsMatch) {
      throw new ForbiddenException();
    }

    const payload = { sub: user.id, username: user.login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(login: string, pass: string) {
    const user = await this.usersService.create({ login, password: pass });
    return { id: user.id, login: user.login };
  }
}
