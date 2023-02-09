import { Module } from '@nestjs/common';
import { CommerçantController } from './commerçant.controller';
import { CommerçantService } from './commerçant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerçantEntity } from './entities/commerçant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommerçantEntity])],
  controllers: [CommerçantController],
  providers: [CommerçantService],
})
export class CommerçantModule {}
