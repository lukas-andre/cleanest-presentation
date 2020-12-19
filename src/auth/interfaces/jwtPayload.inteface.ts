import { BaseJwtPayload } from './baseJwtPayload.inteface';

export interface JwtPayload extends BaseJwtPayload {
  accessToken: string;
  expiresIn: number;
}
