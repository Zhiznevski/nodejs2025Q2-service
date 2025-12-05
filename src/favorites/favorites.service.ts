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
} from './interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}
  private readonly favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  async getFavorites() {
    const [albums, artists, tracks] = await Promise.all([
      this.albumsService.findByIds(this.favorites.albums),
      this.artistsService.findByIds(this.favorites.artists),
      this.tracksService.findByIds(this.favorites.tracks),
    ]);
    return { albums, artists, tracks };
  }

  async addTrack(id: string): Promise<AddRecordToFavoritesResponse> {
    try {
      const track = await this.tracksService.findOne(id);
      this.favorites.tracks.push(track.id);
      return { message: 'The track is successfully added to favorites' };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          "The track doesn't exist in favorites",
        );
      }
    }
  }

  async removeTrack(id: string) {
    const index = this.favorites.tracks.findIndex((el) => el === id);
    if (index === -1) {
      throw new NotFoundException('The track is not found in favorites');
    }
    this.favorites.tracks.splice(index, 1);
  }

  async addAlbum(id: string): Promise<AddRecordToFavoritesResponse> {
    try {
      const album = await this.albumsService.findOne(id);
      this.favorites.albums.push(album.id);
      return { message: 'The album is successfully added to favorites' };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          "The album doesn't exist in favorites",
        );
      }
    }
  }
  async removeAlbum(id: string) {
    const index = this.favorites.albums.findIndex((el) => el === id);
    if (index === -1) {
      throw new NotFoundException('The album is not found in favorites');
    }
    this.favorites.albums.splice(index, 1);
  }

  async addArtist(id: string): Promise<AddRecordToFavoritesResponse> {
    try {
      const artist = await this.artistsService.findOne(id);
      this.favorites.artists.push(artist.id);
      return { message: 'The artist is successfully added to favorites' };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          "The artist doesn't exist in favorites",
        );
      }
    }
  }

  async removeArtist(id: string) {
    const index = this.favorites.artists.findIndex((el) => el === id);
    if (index === -1) {
      throw new NotFoundException('The artist is not found in favorites');
    }
    this.favorites.artists.splice(index, 1);
  }
}
