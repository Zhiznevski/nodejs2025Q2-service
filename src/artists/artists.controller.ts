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
import { ArtistsService } from './artists.service';
import { CreateUpdateArtistDto } from './dto/create-update-artist.dto';
import { ArtistResponseDto } from './dto/artist-response.dto';
@Controller('/artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create an artist' })
  @ApiBody({ type: CreateUpdateArtistDto })
  @ApiCreatedResponse({
    description: 'The artist has been successfully created',
    type: ArtistResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The body does not contain required fields',
  })
  create(@Body() createArtistDto: CreateUpdateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiOkResponse({
    description: 'The list of artists have been successfully retrieved',
    type: [ArtistResponseDto],
  })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single artist' })
  @ApiOkResponse({
    description: 'The artist has been successfully retrieved',
    type: ArtistResponseDto,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the artist' })
  @ApiOkResponse({
    description: 'The artist has been successfully updated',
    type: ArtistResponseDto,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: CreateUpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiNoContentResponse({
    description: 'The artist has been successfully removed',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.artistsService.remove(id);
  }
}
