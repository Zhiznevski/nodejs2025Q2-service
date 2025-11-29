import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    minLength: 4,
    example: "John Dory"
  })
  @IsString()
  @MinLength(4)
  readonly login: string;

  @ApiProperty({
    minLength: 4,
    example: "Qwerty123"
  })
  @IsString()
  @MinLength(4)
  readonly password: string;
}
