import { forwardRef, Module } from '@nestjs/common';
import { BaseUserService } from '../../core/user/base-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../../authentication/auth.module';
import { Repository } from 'typeorm';
import { AdminAntropometricsModule } from '../../../modules/admin/antropometrics/admin-antropomerics.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule), AdminAntropometricsModule],
  providers: [BaseUserService, Repository],
  exports: [BaseUserService],
})
export class BaseUserModule {}
