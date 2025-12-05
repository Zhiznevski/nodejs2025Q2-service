import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/interfaces/albums.interface';
import { ArtistResponseDto } from 'src/artists/interfaces/artistResponseDto.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class GetFavoritesResponse {
  @ApiProperty({ type: [ArtistResponseDto] })
  artists: ArtistResponseDto[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}

export class AddRecordToFavoritesResponse {
  message: string;
}
