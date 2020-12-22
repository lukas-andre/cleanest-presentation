import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { initRolePermissions } from '../../global/data/initRolePermission.data';
import { initRoles } from '../../global/data/initRoles.data';
import { Repository, FindOneOptions } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';
import { PermissionsService } from './permissions.service';

@Injectable()
export class RolesService {
  private readonly serviceName = RolesService.name;
  private readonly logger = new Logger(this.serviceName);

  constructor(
    @InjectRepository(Role, 'example-user-db')
    private readonly rolesRepository: Repository<Role>,
    private readonly permissionsService: PermissionsService,
  ) {}

  async initRoles() {
    const permissions = await this.permissionsService.findAll({});
    for (const initRole of initRoles) {
      const role = Object.assign(new Role(), initRole);
      if (initRole.name !== 'admin') {
        role.permissions = permissions.filter(permission =>
          initRolePermissions
            .find(init => init.role === role.name)
            .controllers.includes(permission.controller),
        );
      }
      this.logger.log(`role: ${JSON.stringify(role)}`);
      await this.rolesRepository.save(role);
    }

    return await this.findAll({});
  }

  async findAll(query: any): Promise<Role[]> {
    const { limit, offset, ...rest } = query;
    return await this.rolesRepository.find({
      where: rest,
      order: {
        created_at: 'ASC',
      },
      skip: offset,
      take: limit,
    });
  }

  async findById(id: number): Promise<Role> {
    return await this.rolesRepository.findOne(id, {
      relations: ['permissions'],
    });
  }

  async findOne(query: FindOneOptions<Role>): Promise<Role> {
    return await this.rolesRepository.findOne(query);
  }
}
