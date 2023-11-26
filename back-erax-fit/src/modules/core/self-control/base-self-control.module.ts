import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseSelfControlService } from './base-self-control.service';
import { SelfControlEntity } from './entity/self-control.entity';
import { BaseUserModule } from '../user/base-user.module';
@Module({
  imports: [TypeOrmModule.forFeature([SelfControlEntity]), forwardRef(() => AuthModule), BaseUserModule],
  exports: [BaseSelfControlService],
  providers: [BaseSelfControlService],
})
export class BaseSelfControlModule {}
