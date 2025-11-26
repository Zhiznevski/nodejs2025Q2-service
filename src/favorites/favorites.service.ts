import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';
import {
  AddRecordToFavoritesResponse,
  Favorites,
  GetFavoritesResponse,
} from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}
  private readonly favorites: Favorites;

  async getFavorites(): Promise<GetFavoritesResponse> {
    const [albums, artists, tracks] = await Promise.all([
      this.albumsService.findByIds(this.favorites.albums),
      this.artistsService.findByIds(this.favorites.artists),
      this.tracksService.findByIds(this.favorites.tracks),
    ]);
    return { albums, artists, tracks };
  }

  async addTrack(id: string): Promise<AddRecordToFavoritesResponse> {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new UnprocessableEntityException(
        "The track doesn't exist in favorites",
      );
    }
    this.favorites.tracks.push(track.id);
    return { message: 'The track is successfully added to favorites' };
  }

  async removeTrack(id: string) {
    const trackIdIndex = this.favorites.tracks.findIndex((el) => el === id);
    if (trackIdIndex === -1) {
      throw new NotFoundException('The track is not found in favorites');
    }
    this.favorites.tracks.splice(trackIdIndex, 1);
  }
}
