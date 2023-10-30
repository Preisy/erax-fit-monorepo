import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { ClientAntropometricsService } from './client-antropometrics.service';
import { Repository } from 'typeorm';
import { BaseUserModule } from '../../core/user/base-user.module';
import { ClientAntropometricsController } from './client-antropometrics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AntropometricsEntity]), forwardRef(() => BaseUserModule)],
  controllers: [ClientAntropometricsController],
  providers: [ClientAntropometricsService, Repository],
  exports: [ClientAntropometricsService],
})
export class ClientAntropometricsModule {}
