import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: "Must match your old password"
  })
  @IsString()
  readonly oldPassword: string;

  @ApiProperty({
    minLength: 4
  })
  @IsString()
  @MinLength(4)
  readonly newPassword: string;
}
