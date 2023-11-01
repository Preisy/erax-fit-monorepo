import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminUserModule } from './modules/admin/user/admin-user.module';
import { AuthModule } from './modules/authentication/auth.module';
import { ClientUserModule } from './modules/client/me/me.module';
import { ClientAntropometricsModule } from './modules/client/antropometrics/client-antropometrics.module';
import { AdminAntropometricsModule } from './modules/admin/antropometrics/admin-antropomerics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    AdminUserModule,
    ClientUserModule,
    ClientAntropometricsModule,
    AdminAntropometricsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
