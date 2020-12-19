import { Controller, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { Body } from '@nestjs/common';
import { CreateUserResponseDto } from '../dto/createUserResponse.dto';
import { CreateUserRequestDto } from '../dto/createUserRequest.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    description: 'Users has been created',
    type: CreateUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Rol does not exists' })
  @ApiConflictResponse({ description: 'Users already exists' })
  @Post()
  async create(@Body() createUserDto: CreateUserRequestDto) {
    return this.usersService.create(createUserDto);
  }
}
