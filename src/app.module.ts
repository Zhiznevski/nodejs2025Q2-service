import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ArtistsController } from './artists/artists.controller';
import { ArtistsService } from './artists/artists.service';
import { AlbumsService } from './albumns/albums.service';
import { AlbumsController } from './albumns/albums.controller';

@Module({
  imports: [],
  controllers: [UsersController, ArtistsController, AlbumsController],
  providers: [UsersService, ArtistsService, AlbumsService],
})
export class AppModule {}
