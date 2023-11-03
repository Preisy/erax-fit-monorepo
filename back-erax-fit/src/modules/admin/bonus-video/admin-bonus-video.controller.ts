import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { UserRole } from 'src/constants/constants';
import { RoleGuard } from '../../../modules/authentication/guards/role.guard';
import { AdminBonusVideoService } from './admin-bonus-video.service';

@Controller('admin/bonus-video')
@ApiTags('Admin bonus video')
@AppAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminBonusVideoController {
  constructor(private readonly adminService: AdminBonusVideoService) {}
}
