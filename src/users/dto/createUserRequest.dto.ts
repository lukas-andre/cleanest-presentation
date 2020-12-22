import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'beers',
    description: 'User Username',
    required: false,
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'Lucas',
    description: 'First Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @ApiProperty({
    example: 'Henry',
    description: 'Last Name',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly lastName: string;

  @ApiProperty({
    example: 'lucas.henry@witi.cl',
    description: 'User Email',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({
    example: '1qaz2wsx',
    description: 'User Passowrd',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: 'beer',
    description: 'User role',
  })
  @IsString()
  readonly role: string;
}
