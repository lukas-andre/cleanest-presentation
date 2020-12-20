import {
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiParam,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ServiceError } from 'src/global/interfaces/serviceError';
import { serviceErrorStringify } from 'src/global/utils/serviceErrorStringify';
import { Permission } from '../entities/permission.entity';
import { InitialPermissionsService } from '../services/initialPermissions.service';
import { PermissionsService } from '../services/permissions.service';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsService: PermissionsService,
    private readonly initialPermissionsService: InitialPermissionsService,
  ) {}

  @ApiOperation({ summary: 'Find Permissions' })
  @ApiOkResponse({
    description: 'The permissions exists.',
    isArray: true,
    type: Permission,
  })
  @Get()
  async findAll(@Query() query: any): Promise<Permission[]> {
    return await this.permissionsService.findAll(query);
  }

  @Get('/initial')
  async initial(): Promise<Permission[]> {
    const result = await this.initialPermissionsService.initPermissions();
    if (result instanceof ServiceError) {
      throw new ConflictException(serviceErrorStringify(result));
    }
    return result;
  }

  @Get('/routes')
  async findRoutes(): Promise<any> {
    return await this.initialPermissionsService.getAllRoutes();
  }

  @ApiOperation({ summary: 'Get Permissions By Id' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiOkResponse({
    description: 'The permissions exists.',
    isArray: true,
    type: Permission,
  })
  @ApiResponse({ status: 404, description: 'Permission does not exist.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permission> {
    const role = await this.permissionsService.findOne({ where: { id } });
    if (!role) {
      throw new NotFoundException();
    }

    return role;
  }
}
