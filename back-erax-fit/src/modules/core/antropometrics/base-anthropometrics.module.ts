import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnthropometricsEntity } from './entities/anthropometrics.entity';
import { BaseAntropometrcisService } from './base-anthropometrics.service';
import { AuthModule } from '../../authentication/auth.module';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AnthropometricsEntity]), forwardRef(() => AuthModule)],
  providers: [BaseAntropometrcisService],
  exports: [BaseAntropometrcisService],
})
export class BaseAntropometricsModule {}
