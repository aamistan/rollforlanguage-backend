import '@fastify/jwt';
import { JwtUser } from './jwtUser';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: JwtUser;
  }
}
