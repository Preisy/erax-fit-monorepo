import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { BaseBonusVideoService } from './base-bonus-video.service';
import { BaseUserModule } from '../user/base-user.module';
import { BonusVideoEntity } from './entities/bonus-video.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BonusVideoEntity]), forwardRef(() => AuthModule), BaseUserModule],
  providers: [BaseBonusVideoService],
  exports: [BaseBonusVideoService],
})
export class BaseBonusVideoModule {}
