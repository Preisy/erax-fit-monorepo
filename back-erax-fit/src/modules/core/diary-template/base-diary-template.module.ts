import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { SelfControlPropsEntity } from '../self-control-props/entity/self-control-props.entity';
import { BaseUserModule } from '../user/base-user.module';
import { UserEntity } from '../user/entities/user.entity';
import { BaseDiaryTemplateService } from './base-diary-template.service';
import { DiaryTemplateEntity } from './entity/diary-template.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([DiaryTemplateEntity, SelfControlPropsEntity, UserEntity]),
    forwardRef(() => AuthModule),
    forwardRef(() => BaseUserModule),
  ],
  exports: [BaseDiaryTemplateService],
  providers: [BaseDiaryTemplateService],
})
export class BaseDiaryTemplateModule {}
