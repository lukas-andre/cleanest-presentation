import { Body, Controller, HttpCode, Logger, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/loginRequest.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { JwtPayload } from './interfaces/jwtPayload.inteface';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login User' })
  @HttpCode(200)
  @ApiOkResponse({ description: 'Login successful.', type: LoginResponseDto })
  @ApiConflictResponse({ description: 'Invalid credentials.' })
  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto): Promise<JwtPayload> {
    return this.authService.login(loginRequestDto);
  }
}
