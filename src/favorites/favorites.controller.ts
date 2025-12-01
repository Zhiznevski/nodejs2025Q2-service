import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { GetFavoritesResponse } from './interfaces/favorites.interface';

@Controller('/favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiOkResponse({
    description: 'The list of favorites have been successfully retrieved',
    type: [GetFavoritesResponse],
  })
  async getFavorites() {
    return this.favoritesService.getFavorites();
  }

  @Post('track/:id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add the track to favorites' })
  @ApiCreatedResponse({
    description: 'The track has been successfully added to favorites',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: "The id doesn't exist" })
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const res = await this.favoritesService.addTrack(id);
    return res.message;
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiNoContentResponse({
    description: 'The track has been successfully removed from favorites',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'The track is not favorite' })
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add the album to favorites' })
  @ApiCreatedResponse({
    description: 'The album has been successfully added to favorites',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: "The id doesn't exist" })
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const res = await this.favoritesService.addAlbum(id);
    return res.message;
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiNoContentResponse({
    description: 'The album has been successfully removed from favorites',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'The album is not favorite' })
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add the artist to favorites' })
  @ApiCreatedResponse({
    description: 'The artist has been successfully added to favorites',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiUnprocessableEntityResponse({ description: "The id doesn't exist" })
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const res = await this.favoritesService.addArtist(id);
    return res.message;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiNoContentResponse({
    description: 'The artist has been successfully removed from favorites',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'The artist is not favorite' })
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
