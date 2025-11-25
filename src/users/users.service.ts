import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { mapUserToUserResponse } from './utils/user.utils';
import { generateId } from 'src/utils/uuid';
import { UpdatePasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findAll() {
    return this.users.map(mapUserToUserResponse);
  }

  async findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('The user is not found');
    }
    return user;
  }

  async create(userDto: CreateUserDto) {
    const id = generateId();
    const createdAt = Number(new Date());
    const version = 1;
    const { login, password } = userDto;
    const createdUser = {
      id,
      createdAt,
      updatedAt: createdAt,
      version,
      login,
      password,
    };
    this.users.push(createdUser);
    return mapUserToUserResponse(createdUser);
  }

  async updatePassword(id: string, userDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    const userIndex = this.users.findIndex((user) => user.id === id);

    const { oldPassword, newPassword } = userDto;
    if (user?.password !== oldPassword) {
      throw new ForbiddenException("Passwords don't match");
    }

    const version = user.version + 1;
    const updatedAt = Number(new Date());

    const updatedUser: User = {
      ...user,
      version,
      updatedAt,
      password: newPassword,
    };
    this.users.splice(userIndex, 1, updatedUser);
    return mapUserToUserResponse(updatedUser);
  }

  async remove(id: string) {
    await this.findOne(id);
    const userIndex = this.users.findIndex((user) => user.id === id);
    this.users.splice(userIndex, 1);
  }
}
