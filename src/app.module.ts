import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { AlbumsService } from './albums/albums.service';
import { AlbumsController } from './albums/albums.controller';
import { TracksController } from './tracks/tracks.controller';
import { TracksService } from './tracks/tracks.service';

@Module({
  imports: [],
  controllers: [
    UsersController,
    ArtistsController,
    AlbumsController,
    TracksController,
  ],
  providers: [UsersService, ArtistsService, AlbumsService, TracksService],
})
export class AppModule {}
