import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateUpdateTrackDto {
  @IsString()
  @MinLength(2)
  readonly name: string;

  @IsInt()
  readonly duration: number;

  readonly artistId: string | null;

  readonly albumId: string | null;
}
