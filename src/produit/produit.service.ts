import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientService } from 'src/client/client.service';
import { ProduitEntity } from './entities/produit.entity';
import { Repository } from 'typeorm';

@Injectable()

export class ProduitService {
    constructor(
        @InjectRepository(ProduitEntity)
        private produitRepository: Repository<ProduitEntity>,
        private clientService: ClientService
    ) { }
    
    async consultCommandeClient(id: number) {
        const client = await this.clientService.getClientById(id);
        
        if (!client){ 
            throw new NotFoundException("client not found");
        }
        const qb = this.produitRepository.createQueryBuilder("produit");
        return qb.innerJoin("commande", "c", "c.produit_id=produit.produit_id")
            .where(`c.client_id = ${id}`);

            
            


    }
    async getProductById(id: number): Promise<ProduitEntity> {
        return await this.produitRepository.findOne({ where: { produit_id: id } });
    }
}