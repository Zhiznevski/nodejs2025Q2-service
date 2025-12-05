import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponseDto } from 'src/albums/dto/album-response.dto';
import { ArtistResponseDto } from 'src/artists/interfaces/artistResponseDto.interface';
import { TrackResponseDto } from 'src/tracks/dto/track-response.dto';

export class Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class GetFavoritesResponse {
  @ApiProperty({ type: [ArtistResponseDto] })
  artists: ArtistResponseDto[];

  @ApiProperty({ type: [AlbumResponseDto] })
  albums: AlbumResponseDto[];

  @ApiProperty({ type: [TrackResponseDto] })
  tracks: TrackResponseDto[];
}

export class AddRecordToFavoritesResponse {
  message: string;
}
