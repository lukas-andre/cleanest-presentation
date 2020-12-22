import { JwtPermission } from './jwtPermssion.inteface';

export interface BaseJwtPayload {
  id: number;
  username: string;
  email?: string;
  permision: JwtPermission[];
}
