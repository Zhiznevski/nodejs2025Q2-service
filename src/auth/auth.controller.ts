import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  SignInResponseDto,
  SignInUserDto,
  SignUpResponseDto,
  SignUpUserDto,
} from './dto/auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: SignInUserDto })
  @ApiOkResponse({
    description: 'The user has been successfully login',
    type: SignInResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The body does not contain required fields',
  })
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signIn(signInUserDto.login, signInUserDto.password);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: SignUpUserDto })
  @ApiOkResponse({
    description: 'The user has been successfully created',
    type: SignUpResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The body does not contain required fields',
  })
  signUp(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signUp(signUpUserDto.login, signUpUserDto.password);
  }
}
