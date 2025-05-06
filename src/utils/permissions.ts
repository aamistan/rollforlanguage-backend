export const rolePermissions: Record<string, string[]> = {
  superadmin: [
    'manage_users',
    'manage_campaigns',
    'view_reports',
    'system_settings',
    'full_access', // catch-all for internal superadmin overrides
  ],
  admin: [
    'manage_users',
    'manage_campaigns',
    'view_reports',
  ],
  teacher: [
    'manage_campaigns',
    'view_reports',
  ],
  student: [
    'submit_progress',
  ],
};

export function checkPermission(role: string, permission: string): boolean {
  const permissions = rolePermissions[role];
  if (!permissions) {
    console.warn(`Unknown role '${role}' passed to checkPermission`);
    return false;
  }
  return permissions.includes(permission);
}
