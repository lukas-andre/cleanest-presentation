import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/services/users.service';
import { User } from '../users/entities/user.entity';
import { LoginRequestDto } from './dto/loginRequest.dto';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { BaseJwtPayload } from './interfaces/baseJwtPayload.inteface';
import { JwtPayload } from './interfaces/jwtPayload.inteface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async login(loginRequestDto: LoginRequestDto): Promise<JwtPayload> {
    const user = await this.usersService.findOne({
      relations: ['role', 'role.permissions'],
      where: { username: loginRequestDto.identifier },
    });

    if (!user) {
      throw new ConflictException('Invalid credentials');
    }

    const validPassword = this.usersService.validatePassword(
      loginRequestDto.identifier,
      user.password,
    );

    if (!validPassword) {
      throw new ConflictException('Invalid credentials');
    }

    return this.generateJwt(user);
  }

  generateJwt(user: User): JwtPayload {
    const jwtPayload: BaseJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      permision: user.role.permissions.map(permission => ({
        c: permission.controller,
        a: permission.action,
      })),
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      issuer: this.configService.get('auth.jwtIssuer'),
      expiresIn: this.configService.get('auth.jwtExpiration'),
    });

    return {
      ...jwtPayload,
      accessToken,
      expiresIn: this.configService.get('auth.jwtExpiration'),
    };
  }
}
