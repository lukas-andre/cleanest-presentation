import { IsNumber, IsString, IsOptional } from 'class-validator';
import { JwtPermission } from '../interfaces/jwtPermssion.inteface';

export class LoginResponseDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  userTypeId?: number;

  @IsString()
  userType: string;

  permision: JwtPermission[];

  @IsString()
  accessToken: string;

  @IsNumber()
  expiresIn: number;
}
