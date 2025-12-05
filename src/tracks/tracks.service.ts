import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { In, Repository } from 'typeorm';
import { Track } from './track.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  private async _findById(id: string) {
    const track = await this.tracksRepository.findOneBy({ id });
    if (!track) {
      throw new NotFoundException('The track is not found');
    }
    return track;
  }

  async findAll() {
    return this.tracksRepository.find();
  }

  async findOne(id: string) {
    return this._findById(id);
  }

  async findByIds(ids: string[]) {
    return this.tracksRepository.findBy({ id: In(ids) });
  }

  async create(trackDto: CreateUpdateTrackDto) {
    const { albumId, artistId, duration, name } = trackDto;
    return this.tracksRepository.save({
      name,
      artistId,
      albumId,
      duration,
    });
  }

  async update(id: string, trackDto: CreateUpdateTrackDto) {
    const track = await this._findById(id);
    const { albumId, artistId, duration, name } = trackDto;
    return this.tracksRepository.save({
      ...track,
      albumId,
      artistId,
      duration,
      name,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.tracksRepository.delete(id);
  }
}
