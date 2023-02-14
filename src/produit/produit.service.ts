import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProduitEntity } from './entities/produit.entity';
import { ClientService } from 'src/client/client.service';
import { CommandesService } from 'src/commandes/commandes.service';
@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(ProduitEntity)
    private produitRepository: Repository<ProduitEntity>,
    private clientService: ClientService,
    private commandesService: CommandesService,
  ) {}
  async getProduits(): Promise<ProduitEntity[]> {
    const qb = this.produitRepository.createQueryBuilder('produit');
    qb.select('*').where('produit.stock > 0');
    return await qb.getRawMany();
  }
  async CommandProduit(
    idClient: number,
    produit_id: number,
  ): Promise<ProduitEntity> {
    const produit = await this.produitRepository.findOneBy({
      produit_id: produit_id,
    });
    const client = await this.clientService.find(idClient);
    produit.stock = produit.stock - 1;
    const newproduit = await this.produitRepository.preload({
      produit_id,
      ...produit,
    });
    await this.produitRepository.save(newproduit);
    const AddCommandeDto = { client_id: idClient, produit_id: produit_id };
    await this.commandesService.add(AddCommandeDto);
    console.log(client.commandes);
    console.log(newproduit);
    return produit;
  }
}
