import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { ClientAntropometricsService } from './client-antropometrics.service';
import { Repository } from 'typeorm';
import { ClientAntropometricsController } from './client-antropometrics.controller';
import { BaseAntropometricsModule } from 'src/modules/core/antropometrics/base-antropometrics.module';
import { UserEntity } from 'src/modules/core/user/entities/user.entity';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { ClientUserModule } from '../me/me.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AntropometricsEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseAntropometricsModule),
    ClientUserModule,
  ],
  controllers: [ClientAntropometricsController],
  providers: [ClientAntropometricsService, Repository],
  exports: [ClientAntropometricsService],
})
export class ClientAntropometricsModule {}
