import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    findAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }
}