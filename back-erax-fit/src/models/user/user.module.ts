import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ClientService } from './client.service';
import { BaseUserService } from './core/base-user.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from '../authentication/auth.module';
import { Repository } from 'typeorm';
import { ClientController } from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), forwardRef(() => AuthModule)],
  controllers: [ClientController, AdminController],
  providers: [BaseUserService, AdminService, ClientService, Repository],
  exports: [AdminService, ClientService],
})
export class UserModule {}
