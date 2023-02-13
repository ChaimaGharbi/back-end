import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity';
import { ProduitService } from 'src/produit/produit.service';
import { CommerçantController } from './commerçant.controller';
import { CommerçantService } from './commerçant.service';
import { CommerçantEntity } from './entities/commerçant.entity';
import { ClientEntity } from '../client/entities/client.entity';
import { ClientService } from "../client/client.service";
import { CommandesEntity } from 'src/commandes/entities/commandes.entity';
import { CommandesService } from 'src/commandes/commandes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommerçantEntity, ProduitEntity, ClientEntity,CommandesEntity]),
  ],
  controllers: [CommerçantController],
  providers: [CommerçantService, ProduitService, ClientService,CommandesService],
})
export class CommerçantModule {}
