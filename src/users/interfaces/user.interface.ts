import { ApiProperty, OmitType } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  login: string;

  password: string;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt: number;

  @ApiProperty()
  updatedAt: number;
}

export class UserResponse extends OmitType(User, ['password']) {}
