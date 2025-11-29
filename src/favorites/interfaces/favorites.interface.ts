import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/albums/interfaces/albums.interface';
import { Artist } from 'src/artists/interfaces/artists.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class GetFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class AddRecordToFavoritesResponse {
  message: string;
}
