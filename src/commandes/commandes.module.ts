import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesEntity } from './entities/commandes.entity';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  imports: [TypeOrmModule.forFeature([CommandesEntity])],
  controllers: [CommandesController],
  providers: [CommandesService,JwtService],
  exports:[CommandesService,]

})
export class CommandesModule {}