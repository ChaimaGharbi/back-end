import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesEntity } from './entities/commandes.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommandesEntity])],
  controllers: [CommandesController],
  providers: [CommandesService],
  exports:[CommandesService]

})
export class CommandesModule {}