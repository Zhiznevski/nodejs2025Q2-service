import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from './interfaces/artists.interface';
import { CreateArtistDto } from './dto/create-artist.dto';
import { generateId } from 'src/utils/uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  //TODO:  Should inject album service to delete(set null I guess) atristId from corresponding album
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

  async create(artistDto: CreateArtistDto) {
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

  async update(id: string, artistDto: UpdateArtistDto) {
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
    await this.findOne(id);
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    this.artists.splice(artistIndex, 1);
  }
}
