import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './interfaces/artists.interface';
import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { generateId } from 'src/utils/uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';

@Injectable()
export class ArtistsService {
  //TODO:  Should inject album service to delete(set null I guess) artistId from corresponding album and delete from favoirites as well
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}
  private readonly artists: Artist[] = [];

  async findAll() {
    return this.artists;
  }

  async findOne(id: string) {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('The artist is not found');
    }
    return artist;
  }

  async create(artistDto: CreateUpdateArtistDto) {
    const id = generateId();
    const { grammy, name } = artistDto;
    const createdArtist: Artist = {
      id,
      grammy,
      name,
    };
    this.artists.push(createdArtist);
    return createdArtist;
  }

  async update(id: string, artistDto: CreateUpdateArtistDto) {
    const artist = await this.findOne(id);
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);

    const { name, grammy } = artistDto;

    const updatedArtist: Artist = {
      ...artist,
      name,
      grammy,
    };
    this.artists.splice(artistIndex, 1, updatedArtist);
    return updatedArtist;
  }

  async remove(id: string) {
    const artist = await this.findOne(id);
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistIndex, 1);

    await this.tracksService.unlinkArtist(artist.id);
    await this.albumsService.unlinkArtist(artist.id);
  }
}
