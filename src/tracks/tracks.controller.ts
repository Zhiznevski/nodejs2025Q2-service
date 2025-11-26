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
import { CreateUpdateTrackDto } from './dto/create-update-track.dto';
import { TracksService } from './tracks.service';

@Controller('/track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createTrackDto: CreateUpdateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: CreateUpdateTrackDto,
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tracksService.remove(id);
  }
}
