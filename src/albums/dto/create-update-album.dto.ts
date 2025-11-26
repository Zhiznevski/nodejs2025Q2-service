import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateUpdateAlbumDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsNumber()
  readonly year: number;

  readonly artistId: string | null;
}
