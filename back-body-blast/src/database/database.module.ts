import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../../../.env'}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'admin',
        database: 'bb_db',
        //host: configService.get('DB_HOST'),
        //port: configService.get('DB_PORT'),
        //username: configService.get('DB_USER'),
        //password: configService.get('DB_PASSWORD'),
       // database: configService.get('DB_TITLE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: false,
        logging: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
