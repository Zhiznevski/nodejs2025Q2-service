import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistResponseDto } from './interfaces/artistResponseDto.interface';
import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  private async _findById(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) {
      throw new NotFoundException('The artist is not found');
    }
    return artist;
  }

  async findAll(): Promise<ArtistResponseDto[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string) {
    return this._findById(id);
  }

  async findByIds(ids: string[]) {
    return this.artistsRepository.findBy({ id: In(ids) });
  }

  async create(artistDto: CreateUpdateArtistDto) {
    const { grammy, name } = artistDto;
    return this.artistsRepository.save({
      grammy,
      name,
    });
  }

  async update(id: string, artistDto: CreateUpdateArtistDto) {
    const artist = await this._findById(id);
    const { name, grammy } = artistDto;

    return this.artistsRepository.save({
      ...artist,
      name,
      grammy,
    });
  }

  async remove(id: string) {
    await this._findById(id);
    await this.artistsRepository.delete(id);
  }
}
