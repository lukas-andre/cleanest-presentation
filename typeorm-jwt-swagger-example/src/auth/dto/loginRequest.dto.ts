import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    example: 'lucas@gmail.com',
    description: 'User Email',
  })
  @IsString()
  readonly identifier: string;

  @ApiProperty({
    example: '1qaz2wsx',
    description: 'User Password',
  })
  @IsString()
  readonly password: string;
}
