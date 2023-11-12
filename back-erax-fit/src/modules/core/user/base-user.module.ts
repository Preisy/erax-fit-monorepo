import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthModule } from '../../authentication/auth.module';
import { BaseUserService } from '../../core/user/base-user.service';
import { UserEntity } from '../../core/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
  providers: [BaseUserService, Repository],
  exports: [BaseUserService],
})
export class BaseUserModule {}
