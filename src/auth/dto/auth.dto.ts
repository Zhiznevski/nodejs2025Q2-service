import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({
    minLength: 4,
    example: 'John Dory',
  })
  @IsString()
  @MinLength(4)
  readonly login: string;

  @ApiProperty({
    minLength: 4,
    example: 'Qwerty123',
  })
  @IsString()
  @MinLength(4)
  readonly password: string;
}

export class SignInResponseDto {
  @ApiProperty()
  accessToken: string;
  refreshToken: string;
}

export class SignUpUserDto extends SignInUserDto {}
export class SignUpResponseDto {
  @ApiProperty()
  message: string;
}
