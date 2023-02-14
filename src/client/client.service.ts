import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/produit/entities/produit.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>,
    @InjectRepository(ProduitEntity)
    private produit: Repository<ProduitEntity>,
  ) {}
  async addProductToFavourites(
    id: number,
    produit: ProduitEntity,
  ): Promise<void> {
    const client = await this.getClientById(id);
    if (!client) {
      throw new NotFoundException('client not found');
    }
    if (!produit) {
      throw new NotFoundException('product not found');
    }
    console.log(client);
    console.log(produit);
    client.favoris = [];
    console.log(client.favoris);

    client.favoris.push(produit);
    console.log(client.favoris);
    await this.clientRepository.save(client);
  }
  async getFavoritesList(id: number) {
    const client = await this.getClientById(id);
    if (!client) {
      throw new NotFoundException('client not found');
    }
    const qb = this.produit.createQueryBuilder('produit');
    qb.innerJoin('favoris', 'f', 'f.produit_id=produit.produit_id').where(
      `f.client_id = ${id}`,
    );
    return qb;
  }
  async getClientById(id: number): Promise<ClientEntity> {
    return await this.clientRepository.findOne({ where: { client_id: id } });
  }
}
