import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Role } from '../entities/role.entity';
import { CreateUserRequestDto } from './createUserRequest.dto';
export class CreateUserResponseDto extends OmitType(CreateUserRequestDto, [
  'password',
  'role',
] as const) {
  @ApiProperty({
    example: 2,
    description: 'Beer Id',
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'admin',
    description: 'User role',
  })
  @IsNumber()
  role: Role;
}
