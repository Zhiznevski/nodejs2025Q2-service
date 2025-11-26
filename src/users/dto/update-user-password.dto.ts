import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly oldPassword: string;

  @IsString()
  @MinLength(4)
  readonly newPassword: string;
}
