import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesController } from './commandes.controller';
import { CommandesService } from './commandes.service';
import { CommandesEntity } from './entities/commandes.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CommandesEntity])],
  controllers: [CommandesController],
  providers: [CommandesService]
})
export class CommandesModule {}
