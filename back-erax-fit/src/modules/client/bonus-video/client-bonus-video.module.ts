import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientUserModule } from '../me/me.module';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { AuthModule } from '../../../modules/authentication/auth.module';
import { ClientBonusVideoController } from './client-bonus-video.controller';
import { BaseBonusVideoModule } from '../../../modules/core/bonus-video/base-bonus-video.module';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BonusVideoEntity]),
    forwardRef(() => AuthModule),
    ClientUserModule,
    BaseBonusVideoModule,
  ],
  controllers: [ClientBonusVideoController],
})
export class ClientBonusVideoModule {}
