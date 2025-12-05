import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CreateUpdateAlbumDto } from './dto/create-update-album.dto';
import { AlbumsService } from './albums.service';
import { AlbumResponse } from './interfaces/albums.interface';

@Controller('/album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create an album' })
  @ApiBody({ type: CreateUpdateAlbumDto })
  @ApiCreatedResponse({
    description: 'The album has been successfully created',
    type: AlbumResponse,
  })
  @ApiBadRequestResponse({
    description: 'The body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateUpdateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiOkResponse({
    description: 'The list of albums have been successfully retrieved',
    type: [AlbumResponse],
  })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single album' })
  @ApiOkResponse({
    description: 'The album has been successfully retrieved',
    type: AlbumResponse,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the album' })
  @ApiOkResponse({
    description: 'The album has been successfully updated',
    type: AlbumResponse,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: CreateUpdateAlbumDto,
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete album' })
  @ApiNoContentResponse({
    description: 'The album has been successfully removed',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.albumsService.remove(id);
  }
}
