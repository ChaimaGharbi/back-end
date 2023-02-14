import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCommerçantDto } from './dto/add-commerçant.dto';
import { CommerçantEntity } from './entities/commerçant.entity';
import { UpdateCommercantDto } from './dto/update-commerçant.dto';
import { ClientEntity } from '../client/entities/client.entity';
import { ProduitEntity } from '../produit/entities/produit.entity';
import { CommandesEntity } from 'src/commandes/entities/commandes.entity';
import { stat } from 'fs';

@Injectable()
export class CommerçantService {
  constructor(
    @InjectRepository(CommerçantEntity)
    private commercantRepository: Repository<CommerçantEntity>,
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private produitRepository: Repository<ProduitEntity>,
    @InjectRepository(CommandesEntity)
    private commandesRepository: Repository<CommandesEntity>,
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
    client_id: number,
    produit_id: number,
  ): Promise<CommandesEntity> {
    const commande = await this.commandesRepository.findOne({
      where: { client_id, produit_id },
    });

    if (!commande) {
      throw new NotFoundException('client ou produit incorect');
    }

    const statu = 'rejetée';

    const commanderejeter = await this.commandesRepository.preload({
      ...commande,
      status: statu,
    });
    console.log(commanderejeter);
    return await this.commandesRepository.save(commanderejeter);
  }
  async accepterCommandes(
    client_id: number,
    produit_id: number,
  ): Promise<CommandesEntity> {
    const commande = await this.commandesRepository.findOne({
      where: { client_id, produit_id },
    });

    if (!commande) {
      throw new NotFoundException('client ou produit incorect');
    }

    const statu = 'accepté';

    const commanderejeter = await this.commandesRepository.preload({
      ...commande,
      status: statu,
    });
    console.log(commanderejeter);

    return await this.produitRepository.save(commanderejeter);
  }
}
