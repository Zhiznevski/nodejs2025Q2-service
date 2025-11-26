import { Album } from 'src/albums/interfaces/albums.interface';
import { Artist } from 'src/artists/interfaces/artists.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface GetFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export interface AddRecordToFavoritesResponse {
  message: string;
}
