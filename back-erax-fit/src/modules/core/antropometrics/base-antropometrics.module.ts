import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { Repository } from 'typeorm';
import { BaseUserModule } from '../user/base-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AntropometricsEntity]), forwardRef(() => BaseUserModule)],
  providers: [BaseAntropometrcisService, Repository],
  exports: [BaseAntropometrcisService],
})
export class BaseAntropometricsModule {}
