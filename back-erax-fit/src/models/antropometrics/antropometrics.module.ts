import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from './entities/antropometrics.entity';
import { AntropometricsController } from './antropometrics.controller';
import { AdminAntropometricsController } from './admin-antropometrics.controller';
import { BaseAntropometrcisService } from './core/base-antropometrics.service';
import { AntropometricsService } from './antropometrics.service';
import { AdminAntropometricsService } from './admin-antropometrics.service';

@Module({
  imports: [TypeOrmModule.forFeature([AntropometricsEntity])],
  controllers: [AntropometricsController, AdminAntropometricsController],
  providers: [BaseAntropometrcisService, AntropometricsService, AdminAntropometricsService],
  exports: [AntropometricsService, AdminAntropometricsService],
})
export class AntropometricsModule {}
