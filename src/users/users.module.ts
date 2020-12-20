import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { InitialPermissionsService } from './services/initialPermissions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission], 'example-user-db'),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    RolesService,
    PermissionsService,
    InitialPermissionsService,
  ],
  exports: [UsersService, RolesService],
})
export class UsersModule {}
