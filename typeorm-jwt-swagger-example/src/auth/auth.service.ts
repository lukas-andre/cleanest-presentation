import { Injectable } from '@nestjs/common';
import { LoginRequestDto } from './dto/loginRequest.dto';

@Injectable()
export class AuthService {
    login(loginRequestDto: LoginRequestDto): import("./dto/loginResponse.dto").LoginResponseDto | PromiseLike<import("./dto/loginResponse.dto").LoginResponseDto> {
        throw new Error('Method not implemented.');
    }
}
