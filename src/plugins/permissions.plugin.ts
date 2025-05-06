import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { checkPermission } from '../utils/permissions';

interface JwtUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

const permissionsPlugin: FastifyPluginAsync = async (app) => {
  app.decorateRequest('hasPermission', function (this: FastifyRequest, permission: string) {
    const rawUser = this.user;

    if (
      typeof rawUser === 'object' &&
      rawUser !== null &&
      'role' in rawUser &&
      typeof (rawUser as JwtUser).role === 'string'
    ) {
      const user = rawUser as JwtUser;

      if (user.role === 'superadmin') {
        return true;
      }

      return checkPermission(user.role, permission);
    }

    return false;
  });
};

export default permissionsPlugin;
