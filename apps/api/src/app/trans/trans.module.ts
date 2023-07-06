import { Module } from '@nestjs/common';
import { TransController } from './trans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransEntity } from './entities/trans.entity';
import { TransService } from './trans.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([TransEntity]),
  ],
  controllers: [TransController],
  providers: [TransService]
})
export class TransModule {}