import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';


export class CreateUpdateAlbumDto {
  @ApiProperty({
    minLength: 2,
    example: "Dancing Shadows"
  })
  @IsString()
  @MinLength(2)
  readonly name: string;

  @ApiProperty({
    example: 1996
  })
  @IsNumber()
  readonly year: number;

  @ApiProperty({
    example: null,
  })
  readonly artistId: string | null;
}
