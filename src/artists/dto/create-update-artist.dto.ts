import { IsBoolean, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateArtistDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({
    minLength: 2,
    example: 'Mario',
  })
  readonly name: string;

  @ApiProperty()
  @IsBoolean()
  readonly grammy: boolean;
}
