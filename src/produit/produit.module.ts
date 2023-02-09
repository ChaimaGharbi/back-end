import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { CommerçantEntity } from 'src/commerçant/entities/commerçant.entity';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProduitEntity,CommerçantEntity])],
  controllers: [ProduitController],
  providers: [ProduitService,CommerçantService]
})
export class ProduitModule {}
