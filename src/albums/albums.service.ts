import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateAlbumDto } from './dto/create-update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './album.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
  ) { }

  private async _findById(id: string) {
    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) {
      throw new NotFoundException('The album is not found');
    }
    return album;
  }

  async findAll() {
    return this.albumsRepository.find();
  }

  async findOne(id: string) {
    return this._findById(id);
  }

  async findByIds(ids: string[]) {
    return this.albumsRepository.findBy({ id: In(ids) });
  }

  async create(albumDto: CreateUpdateAlbumDto) {
    const { artistId, name, year } = albumDto;
    return this.albumsRepository.save({
      artistId: artistId,
      name,
      year,
    });
  }

  async update(id: string, albumDto: CreateUpdateAlbumDto) {
    const album = await this._findById(id);

    const { artistId, name, year } = albumDto;

    return this.albumsRepository.save({
      ...album,
      artistId,
      name,
      year,
    });
  }

  async remove(id: string) {
    await this._findById(id);
    return this.albumsRepository.delete(id);
  }
}
