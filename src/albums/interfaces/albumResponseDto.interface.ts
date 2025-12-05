import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string | null;
}
