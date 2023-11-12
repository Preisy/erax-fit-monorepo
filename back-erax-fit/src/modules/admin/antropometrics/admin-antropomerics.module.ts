import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { AdminAntropometricsService } from './admin-antropometrics.service';
import { AdminAntropometricsController } from './admin-antropometrics.controller';
import { BaseAntropometricsModule } from '../../../modules/core/antropometrics/base-antropometrics.module';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AntropometricsEntity]),
    forwardRef(() => AuthModule),
    BaseAntropometricsModule,
    ScheduleModule,
  ],
  controllers: [AdminAntropometricsController],
  providers: [AdminAntropometricsService],
  exports: [AdminAntropometricsService],
})
export class AdminAntropometricsModule {}
