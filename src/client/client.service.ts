import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientEntity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProduitService } from 'src/produit/produit.service';
import { ProduitEntity } from 'src/produit/entities/produit.entity';


@Injectable()
export class ClientService {
    constructor(

        @InjectRepository(ClientEntity)
        private clientRepository: Repository<ClientEntity>,

    ) { }
    async addProductToFavourites(id: number, produit: ProduitEntity): Promise<void> {
        const client = await this.getClientById(id);
        if (!client) {
            throw new NotFoundException("client not found");
        }
        if (!produit) {
            throw new NotFoundException("product not found");
        }
        client.favoris.push(produit);
    }


    async getClientById(id: number): Promise<ClientEntity> {
        return await this.clientRepository.findOne({ where: { client_id: id } });
    }
}

