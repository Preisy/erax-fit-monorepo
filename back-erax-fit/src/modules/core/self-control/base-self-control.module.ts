import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/authentication/auth.module';
import { BaseSelfControlService } from './base-self-control.service';
import { SelfControlEntity } from './entity/self-control.entity';
import { BaseDiaryTemplateModule } from '../diary-template/base-diary-template.module';
import { BaseWorkoutModule } from '../workout/base-workout.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([SelfControlEntity]),
    forwardRef(() => AuthModule),
    BaseWorkoutModule,
    BaseDiaryTemplateModule,
  ],
  exports: [BaseSelfControlService],
  providers: [BaseSelfControlService],
})
export class BaseSelfControlModule {}
