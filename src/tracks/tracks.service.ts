import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from './interfaces/track.interface';
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { generateId } from 'src/utils/uuid';

@Injectable()
export class TracksService {
  private readonly tracks: Track[] = [];

  async findAll() {
    return this.tracks;
  }

  async findOne(id: string) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('The track is not found');
    }
    return track;
  }

  async findByIds(ids: string[]) {
    return this.tracks.filter((track) => ids.includes(track.id));
  }

  async create(trackDto: CreateUpdateTrackDto) {
    const id = generateId();
    const { albumId, artistId, duration, name } = trackDto;
    const createdTrack: Track = {
      id,
      name: name,
      artistId: artistId,
      albumId: albumId,
      duration: duration,
    };

    this.tracks.push(createdTrack);
    return createdTrack;
  }

  async update(id: string, trackDto: CreateUpdateTrackDto) {
    const track = await this.findOne(id);
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    const { albumId, artistId, duration, name } = trackDto;

    const updatedTrack: Track = {
      ...track,
      albumId,
      artistId,
      duration,
      name,
    };
    this.tracks.splice(trackIndex, 1, updatedTrack);
    return updatedTrack;
  }

  async remove(id: string) {
    await this.findOne(id);
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    this.tracks.splice(trackIndex, 1);
  }

  async unlinkAlbum(albumId: string) {
    for (const track of this.tracks) {
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    }
  }

  async unlinkArtist(artistId: string) {
    for (const track of this.tracks) {
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    }
  }
}
