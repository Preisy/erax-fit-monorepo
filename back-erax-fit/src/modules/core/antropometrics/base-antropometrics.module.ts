import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { Repository } from 'typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { UserEntity } from '../user/entities/user.entity';
import { BaseUserModule } from '../user/base-user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AntropometricsEntity]), forwardRef(() => AuthModule), BaseUserModule],
  providers: [BaseAntropometrcisService, Repository],
  exports: [BaseAntropometrcisService],
})
export class BaseAntropometricsModule {}
