import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RefreshTokenDto,
  RefreshTokenResponseDto,
  SignInResponseDto,
  SignInUserDto,
  SignUpResponseDto,
  SignUpUserDto,
} from './dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtRefreshAuthGuard } from './jwt-refresh.guard';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // @Public()
  @UseGuards(LocalAuthGuard)
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
  signIn(@Req() req) {
    return this.authService.signIn(req.user);
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

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({
    description: 'Access and refresh tokens are successfully retrieved',
    type: RefreshTokenResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The body does not contain refresh token',
  })
  async refresh(@Req() req) {
    return this.authService.refresh(req.user);
  }
}
