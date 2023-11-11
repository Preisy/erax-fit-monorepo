import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AntropometricsEntity]), forwardRef(() => AuthModule)],
  providers: [BaseAntropometrcisService],
  exports: [BaseAntropometrcisService],
})
export class BaseAntropometricsModule {}
