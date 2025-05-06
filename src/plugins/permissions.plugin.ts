import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { checkPermission } from '../utils/permissions';

const permissionsPlugin: FastifyPluginAsync = async (app) => {
  app.decorateRequest('hasPermission', function (this: FastifyRequest, permission: string) {
    const user = this.user;

    if (!user) {
      return false;
    }

    // Superadmin shortcut: always true
    if (user.role === 'superadmin') {
      return true;
    }

    return checkPermission(user.role, permission);
  });
};

export default permissionsPlugin;
