import { IsBoolean, IsString, MinLength } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsBoolean()
  readonly grammy: boolean;
}
