import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponseDto } from 'src/albums/dto/album-response.dto';
import { ArtistResponseDto } from 'src/artists/dto/artist-response.dto';
import { TrackResponseDto } from 'src/tracks/dto/track-response.dto';

export class GetFavoritesResponseDto {
  @ApiProperty({ type: [ArtistResponseDto] })
  artists: ArtistResponseDto[];

  @ApiProperty({ type: [AlbumResponseDto] })
  albums: AlbumResponseDto[];

  @ApiProperty({ type: [TrackResponseDto] })
  tracks: TrackResponseDto[];
}

export class AddRecordToFavoritesResponseDto {
  message: string;
}
