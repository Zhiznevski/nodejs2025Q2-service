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
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { TracksService } from './tracks.service';
import { TrackResponse } from './interfaces/track.interface';

@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a track' })
  @ApiBody({ type: CreateUpdateTrackDto })
  @ApiCreatedResponse({
    description: 'The track has been successfully created',
    type: TrackResponse,
  })
  create(@Body() createTrackDto: CreateUpdateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiOkResponse({
    description: 'The list of tracks have been successfully retrieved',
    type: [TrackResponse],
  })
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single track' })
  @ApiOkResponse({
    description: 'The track has been successfully retrieved',
    type: TrackResponse,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update the track' })
  @ApiOkResponse({
    description: 'The track has been successfully updated',
    type: TrackResponse,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: CreateUpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete track' })
  @ApiNoContentResponse({
    description: 'The track has been successfully removed',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
