import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  grammy: boolean;
}
