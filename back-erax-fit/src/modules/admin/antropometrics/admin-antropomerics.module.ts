import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { AdminAntropometricsService } from './admin-antropometrics.service';
import { Repository } from 'typeorm';
import { BaseUserModule } from '../../../modules/core/user/base-user.module';
import { AdminAntropometricsController } from './admin-antropometrics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AntropometricsEntity]), forwardRef(() => BaseUserModule)],
  controllers: [AdminAntropometricsController],
  providers: [AdminAntropometricsService, Repository],
  exports: [AdminAntropometricsService],
})
export class AdminAntropometricsModule {}
