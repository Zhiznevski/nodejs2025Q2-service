import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  readonly oldPassword: string;

  @IsString()
  @MinLength(6)
  readonly newPassword: string;
}
