import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  artistId: string | null;

  @ApiProperty()
  albumId: string | null;

  @ApiProperty()
  duration: number;
}

export class TrackResponse extends Track {}
