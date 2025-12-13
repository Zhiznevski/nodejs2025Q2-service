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
import { UserResponseDto } from './dto/user-response.dto';
import { checkPassword, hashPassword } from 'src/utils/bcrypt';
import { LoggingService } from 'src/logger/logger.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private loggingService: LoggingService,
  ) { }

  private async _findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('The user is not found');
    }
    return user;
  }
  async findByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ login });
    if (!user) {
      throw new NotFoundException('The user is not found');
    }
    return user;
  }
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    this.loggingService.log(users)
    return users.map(mapUserToUserResponseDto);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this._findById(id);
    return mapUserToUserResponseDto(user);
  }

  async create(userDto: CreateUserDto): Promise<UserResponseDto> {
    const { login, password } = userDto;
    const hashedPassword = await hashPassword(password);
    const createdUser = await this.usersRepository.save({
      login,
      password: hashedPassword,
    });
    return mapUserToUserResponseDto(createdUser);
  }

  async updatePassword(
    id: string,
    userDto: UpdatePasswordDto,
  ): Promise<UserResponseDto> {
    const user = await this._findById(id);
    const { oldPassword, newPassword } = userDto;

    const isPasswordsMatch = await checkPassword(oldPassword, user.password);
    if (!isPasswordsMatch) {
      throw new ForbiddenException("Passwords don't match");
    }
    const newHashedPassword = await hashPassword(newPassword);
    Object.assign(user, {
      password: newHashedPassword,
    });

    const updatedUser = await this.usersRepository.save(user);
    return mapUserToUserResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    await this._findById(id);
    await this.usersRepository.delete(id);
  }
}
