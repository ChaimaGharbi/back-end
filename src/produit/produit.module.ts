import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { CommerçantEntity } from 'src/commerçant/entities/commerçant.entity';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { ClientEntity } from "../client/entities/client.entity";
import { ClientService } from "../client/client.service";

@Module({
  imports: [TypeOrmModule.forFeature([ProduitEntity,CommerçantEntity, ClientEntity])],
  controllers: [ProduitController],
  providers: [ProduitService,CommerçantService,ClientService]
})
export class ProduitModule {}
