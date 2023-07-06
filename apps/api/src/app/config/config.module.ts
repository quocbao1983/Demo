import { Module } from '@nestjs/common';
import { ConfigController } from './config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigEntity } from './entities/config.entity';
import { ConfigService } from './config.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigEntity]),
  ],
  controllers: [ConfigController],
  providers: [ConfigService]
})
export class ConfigModule {}