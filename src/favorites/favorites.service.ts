import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { AddRecordToFavoritesResponse } from './interfaces/favorites.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Artist } from 'src/artists/artist.entity';
import { Album } from 'src/albums/album.entity';
import { Track } from 'src/tracks/track.entity';
import { Favorites } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
  ) {}

  private async _findOrCreateFavorites() {
    let [favorites] = await this.favoritesRepository.find();
    if (!favorites) {
      favorites = await this.favoritesRepository.save({
        artists: [],
        albums: [],
        tracks: [],
      });
    }

    return favorites;
  }

  async getFavorites() {
    const favorites = await this._findOrCreateFavorites();
    const [albums, artists, tracks] = await Promise.all([
      this.albumsRepository.findBy({ id: In(favorites.albums) }),
      this.artistsRepository.findBy({ id: In(favorites.artists) }),
      this.tracksRepository.findBy({ id: In(favorites.tracks) }),
    ]);
    return { albums, artists, tracks };
  }

  async addTrack(id: string): Promise<AddRecordToFavoritesResponse> {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new UnprocessableEntityException("The track doesn't exist");
    }
    const favorites = await this._findOrCreateFavorites();
    favorites.tracks.push(track.id);
    await this.favoritesRepository.save(favorites);
    return { message: 'The track is successfully added to favorites' };
  }

  async removeTrack(id: string) {
    const favorites = await this._findOrCreateFavorites();
    const index = favorites.tracks.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('The track is not found in favorites');
    }
    favorites.tracks.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async addAlbum(id: string): Promise<AddRecordToFavoritesResponse> {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new UnprocessableEntityException("The album doesn't exist");
    }
    const favorites = await this._findOrCreateFavorites();
    favorites.albums.push(album.id);
    await this.favoritesRepository.save(favorites);
    return { message: 'The album is successfully added to favorites' };
  }

  async removeAlbum(id: string) {
    const favorites = await this._findOrCreateFavorites();
    const index = favorites.albums.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('The album is not found in favorites');
    }
    favorites.albums.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }

  async addArtist(id: string): Promise<AddRecordToFavoritesResponse> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new UnprocessableEntityException("The artist doesn't exist");
    }
    const favorites = await this._findOrCreateFavorites();
    favorites.artists.push(artist.id);
    await this.favoritesRepository.save(favorites);
    return { message: 'The artist is successfully added to favorites' };
  }

  async removeArtist(id: string) {
    const favorites = await this._findOrCreateFavorites();
    const index = favorites.artists.indexOf(id);
    if (index === -1) {
      throw new NotFoundException('The artist is not found in favorites');
    }
    favorites.artists.splice(index, 1);
    await this.favoritesRepository.save(favorites);
  }
}
