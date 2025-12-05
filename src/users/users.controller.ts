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
  ApiForbiddenResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user-password.dto';
import { UserResponse } from './interfaces/user.interface';

@Controller('/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a user with login and password' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'The user has been successfully created',
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    description: 'The body does not contain required fields',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    description: 'The list of users have been successfully retrieved',
    type: [UserResponse],
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user' })
  @ApiOkResponse({
    description: 'The user has been successfully retrieved',
    type: UserResponse,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: "Update user's password" })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiOkResponse({
    description: "The user's password has been successfully updated",
    type: UserResponse,
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  @ApiForbiddenResponse({ description: 'The oldPassword is wrong' })
  updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete user' })
  @ApiNoContentResponse({
    description: 'The user has been successfully removed',
  })
  @ApiBadRequestResponse({ description: 'The id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: "The id doesn't exist" })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
