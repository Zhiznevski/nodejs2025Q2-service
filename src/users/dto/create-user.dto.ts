import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  readonly login: string;

  @IsString()
  @MinLength(4)
  readonly password: string;
}
