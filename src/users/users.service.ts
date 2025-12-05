import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { mapUserToUserResponseDto } from './utils/user.utils';
import { UserResponseDto } from './interfaces/userResponseDto.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private async _findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('The user is not found');
    }
    return user;
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return users.map(mapUserToUserResponseDto);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this._findById(id);
    return mapUserToUserResponseDto(user);
  }

  async create(userDto: CreateUserDto): Promise<UserResponseDto> {
    const { login, password } = userDto;
    const createdUser = await this.usersRepository.save({
      login,
      password,
    });
    return mapUserToUserResponseDto(createdUser);
  }

  async updatePassword(
    id: string,
    userDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this._findById(id);
    const { oldPassword, newPassword } = userDto;
    if (user?.password !== oldPassword) {
      throw new ForbiddenException("Passwords don't match");
    }

    Object.assign(user, {
      password: newPassword,
    });

    const updatedUser = await this.usersRepository.save(user);
    return mapUserToUserResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    await this._findById(id);
    await this.usersRepository.delete(id);
  }
}
