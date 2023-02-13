import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { CommerçantEntity } from './entities/commerçant.entity';
import { UpdateCommercantDto } from './dto/update-commerçant.dto';
import { ClientEntity } from "../client/entities/client.entity";
import { ProduitEntity } from "../produit/entities/produit.entity";

@Injectable()
export class CommerçantService {
  constructor(
    @InjectRepository(CommerçantEntity)
    private commercantRepository: Repository<CommerçantEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private produitRepository: Repository<ProduitEntity>,
  ) {}
  async getCommercant(): Promise<CommerçantEntity[]> {
    return await this.commercantRepository.find();
  }
  async getCommercantById(id: number): Promise<CommerçantEntity> {
    const com = await this.commercantRepository.findOne({
      where: { commerçant_id: id },
    });
    if (!com) {
      throw new NotFoundException("ce commerçant n'existe pas");
    }
    return com;
  }

  async addCommercant(com: AddCommerçantDto): Promise<CommerçantEntity> {
    return await this.commercantRepository.save(com);
  }
  async updateCommercant(id: number, newCom: UpdateCommercantDto) {
    const com = await this.commercantRepository.preload({
      commerçant_id: id,
      ...newCom,
    });
    return await this.commercantRepository.save(com);
  }

  async deleteProduitFromCommandes(
    commerçant_id: number,
    client_id: number,
    produit_id: number,
  ): Promise<void> {
    console.log(client_id);
    const client = await this.clientRepository.findOne({
      where: { client_id: client_id },
    });
    const produit = await this.produitRepository.findOne({
      where: { produit_id: produit_id },
    });
    if (!client || !produit) {
      throw new Error('Client or product not found');
    }
    if (produit.commerçant.commerçant_id !== commerçant_id) {
      throw new Error('You can only delete products that belong to you!');
    }
    const index = client.commandes.indexOf(produit);
    if (index === -1) {
      throw new Error('this product is not ordered by this client!');
    }
    client.commandes.splice(index, 1);
    await this.clientRepository.save(client);
  }
}
