import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../user.entity';

export class UserResponse extends OmitType(User, ['password']) { }
