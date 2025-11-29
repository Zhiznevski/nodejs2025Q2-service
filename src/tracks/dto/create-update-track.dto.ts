import { IsInt, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateTrackDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    minLength: 2,
    example: 'I wanna be yours',
  })

  readonly name: string;

  @IsInt()
  @ApiProperty({
    example: 360,
  })
  readonly duration: number;

  @ApiProperty({
    example: null,
  })
  readonly artistId: string | null;

  @ApiProperty({
    example: null,
  })
  readonly albumId: string | null;
}
