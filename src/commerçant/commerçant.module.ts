import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity';
import { ProduitService } from 'src/produit/produit.service';
import { CommerçantController } from './commerçant.controller';
import { CommerçantService } from './commerçant.service';
import { CommerçantEntity } from './entities/commerçant.entity';

@Module({
  imports:[TypeOrmModule.forFeature([CommerçantEntity,ProduitEntity])],
  controllers: [CommerçantController],
  providers: [ProduitService, CommerçantService]
})
export class CommerçantModule {}
