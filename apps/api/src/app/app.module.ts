import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { TransModule } from './trans/trans.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.221.222.71',
      port: 3306,
      username: 'tazaspac_chikiet',
      password: '@Hikiet88',
      database: 'tazaspac_nodejs',
      autoLoadEntities: true,
      synchronize: true,
      charset: "utf8mb4",
    },),
    ConfigModule,
    TransModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
