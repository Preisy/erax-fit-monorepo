import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { MeAntropometricsService } from './me-antropometrics.service';
import { Repository } from 'typeorm';
import { BaseUserModule } from '../../core/user/base-user.module';
import { MeAntropometricsController } from './me-antropometrics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AntropometricsEntity]), forwardRef(() => BaseUserModule)],
  controllers: [MeAntropometricsController],
  providers: [MeAntropometricsService, Repository],
  exports: [MeAntropometricsService],
})
export class ClientAntropometricsModule {}
