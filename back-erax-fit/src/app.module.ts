import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AdminFileModule } from './modules/admin/file/admin-file.module';
import { AdminWorkoutModule } from './modules/admin/workout/admin-workout.module';
import { AuthModule } from './modules/authentication/auth.module';
import { ClientFileModule } from './modules/client/file/client-file.module';
import { ClientWorkoutModule } from './modules/client/workout/client-workout.module';
import { AdminUserModule } from './modules/admin/user/admin-user.module';
import { MeModule } from './modules/client/me/me.module';
import { ClientAntropometricsModule } from './modules/client/antropometrics/client-antropometrics.module';
import { AdminAntropometricsModule } from './modules/admin/antropometrics/admin-antropomerics.module';
import { AdminPromptModule } from './modules/admin/prompt/admin-prompt.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminBonusVideoModule } from './modules/admin/bonus-video/admin-bonus-video.module';
import { ClientBonusVideoModule } from './modules/client/bonus-video/client-bonus-video.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    AdminUserModule,
    AdminWorkoutModule,
    ClientFileModule,
    ClientWorkoutModule,
    ClientFileModule,
    ClientBonusVideoModule,
    AdminFileModule,
    MeModule,
    ClientAntropometricsModule,
    AdminAntropometricsModule,
    AdminPromptModule,
    AdminBonusVideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
