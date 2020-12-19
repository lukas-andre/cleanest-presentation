import { JwtPermission } from './jwtPermssion.inteface';

export interface BaseJwtPayload {
  id: number;
  username: string;
  fullname: string;
  email?: string;
  userType: string;
  userTypeId: number;
  profileThumbnail: string;
  permision: JwtPermission[];
}
