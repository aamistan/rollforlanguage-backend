// src/plugins/permissions.plugin.ts

import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin'; // ✅ ensure fastify-plugin is used
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

// ✅ Export the plugin wrapped in fastify-plugin to disable encapsulation
export default fp(permissionsPlugin, { name: 'permissionsPlugin' });
