import { UseGuards } from '@nestjs/common';
import { UserRole } from 'src/constants/constants';
import { RoleGuard } from 'src/authentication/guards/role.guard';

export const AppRoles = (...roles: UserRole[]) => {
  return UseGuards(RoleGuard(roles));
};