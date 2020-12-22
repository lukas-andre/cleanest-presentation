import { Role } from '../entities/role.entity';
export class CreateUserResponseDto {
  id: number;
  username?: string;
  email?: string;
  active?: boolean;
  userType?: string;
  role?: Role;
}
