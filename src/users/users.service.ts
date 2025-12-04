import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { generateId } from 'src/utils/uuid';
import { UpdatePasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException('The user is not found');
    }
    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const id = generateId();
    const createdAt = Number(new Date());
    const version = 1;
    const { login, password } = userDto;
    const user = {
      id,
      createdAt,
      updatedAt: createdAt,
      version,
      login,
      password,
    };
    return this.usersRepository.create(user)
  }

  async updatePassword(id: string, userDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    const { oldPassword, newPassword } = userDto;
    if (user?.password !== oldPassword) {
      throw new ForbiddenException("Passwords don't match");
    }

    const version = user.version + 1;
    const updatedAt = Number(new Date());

    const updateDto: User = {
      ...user,
      version,
      updatedAt,
      password: newPassword,
    };

    return this.usersRepository.update(id, updateDto)
  }

  async remove(id: string) {

    await this.usersRepository.delete(id)
  }
}
