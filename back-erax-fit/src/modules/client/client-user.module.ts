import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../core/user/entities/user.entity';
import { AuthModule } from '../authentication/auth.module';
import { Repository } from 'typeorm';
import { ClientUserService } from '../client/client-user.service';
import { BaseUserModule } from '../core/user/base-user.module';
import { ClientUserController } from './client-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule), BaseUserModule],
  controllers: [ClientUserController],
  providers: [ClientUserService, Repository],
  exports: [ClientUserService],
})
export class ClientUserModule {}
