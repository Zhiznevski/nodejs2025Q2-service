import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from './interfaces/albums.interface';
import { CreateUpdateAlbumDto } from './dto/create-update-album.dto';
import { generateId } from 'src/utils/uuid';

@Injectable()
export class AlbumsService {
  //TODO:  Should inject other staff ( favorite and entities )
  private readonly albums: Album[] = [];

  async findAll() {
    return this.albums;
  }

  async findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('The album is not found');
    }
    return album;
  }

  async create(albumDto: CreateUpdateAlbumDto) {
    const id = generateId();
    const { artistId, name, year } = albumDto;
    const createdAlbum: Album = {
      id,
      artistId: artistId,
      name,
      year,
    };
    this.albums.push(createdAlbum);
    return createdAlbum;
  }

  async update(id: string, albumDto: CreateUpdateAlbumDto) {
    const album = await this.findOne(id);
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    const { artistId, name, year } = albumDto;

    const updatedAlbum: Album = {
      ...album,
      artistId,
      name,
      year,
    };
    this.albums.splice(albumIndex, 1, updatedAlbum);
    return updatedAlbum;
  }

  async remove(id: string) {
    await this.findOne(id);
    const albumnIndex = this.albums.findIndex((album) => album.id === id);
    this.albums.splice(albumnIndex, 1);
  }
}
