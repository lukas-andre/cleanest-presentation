import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { RolesService } from '../services/roles.service';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Init Roles (Init Permissions first)' })
  @ApiOkResponse({ description: 'Init roles ok', isArray: true, type: Role })
  @Get('init-roles')
  async initRoles(): Promise<Role[]> {
    
    return await this.rolesService.initRoles();
  }

  @ApiOperation({ summary: 'Find Roles' })
  @ApiOkResponse({ isArray: true, type: Role })
  @Get()
  async findAll(@Query() query: any): Promise<Role[]> {
    return await this.rolesService.findAll(query);
  }

  @ApiOperation({ summary: 'Get Role By Id' })
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ description: 'The role exists.', type: Role })
  @ApiNotFoundResponse({ status: 404, description: 'Role does not exist.' })
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Role> {
    const role = await this.rolesService.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }
}
