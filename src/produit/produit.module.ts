import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { ClientEntity } from 'src/client/entities/client.entity';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProduitEntity, ClientEntity])],
  controllers: [ProduitController],
  providers: [ProduitService,ClientService],
})
export class ProduitModule { }