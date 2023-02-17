import { Injectable, NotFoundException } from '@nestjs/common';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { addProduitDto } from './dto/add-produit.dto';
import { updateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProduitEntity } from './entities/produit.entity';
import { ClientService } from 'src/client/client.service';
import { CommandesService } from '../commandes/commandes.service';
@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(ProduitEntity)
    private produitRepository: Repository<ProduitEntity>,
    private commercantService: CommerçantService,
    private clientService: ClientService,
    private commandesService: CommandesService,
  ) {}

  async gett() {
    return await this.produitRepository.find();
  }

  async addProduit(id: number, produit: addProduitDto): Promise<ProduitEntity> {
    const Commercant = await this.commercantService.getCommercantById(id);

    if (!Commercant) {
      throw new NotFoundException('commercant not found');
    }
    const newproduit = {
      ...produit,
      commerçant: Commercant,
    };
    return await this.produitRepository.save(newproduit);
  }

  async suppProduit(id: number) {
    const produit = await this.produitRepository.findOne({
      where: { produit_id: id },
    });
    if (!produit) {
      throw new NotFoundException('product not found');
    }

    return await this.produitRepository.remove(produit);
  }

  async consultProduit(id: number) {
    const Commercant = await this.commercantService.getCommercantById(id);

    if (!Commercant) {
      throw new NotFoundException('commercant not found');
    }
    const sql = this.produitRepository.createQueryBuilder('produit');
    sql.where(`produit.commerçantCommerçantId = ${id}`);

    return sql.getMany();
  }

  async editProduit(id: number, newproduit: updateProduitDto) {
    const produit = await this.produitRepository.preload({
      produit_id: id,
      ...newproduit,
    });
    return this.produitRepository.save(produit);
  }

  async getProduitcommandee() {
    const sql = this.produitRepository.createQueryBuilder('produit');
    sql
      .innerJoin('commandes', 'c', 'c.produit_id=produit.produit_id')
      .innerJoin('client', 'cl', 'cl.client_id=c.client_id');
    return sql;
  }
  async consultCommandeClient(id: number) {
    const client = await this.clientService.getClientById(id);

    if (!client) {
      throw new NotFoundException('client not found');
    }
    const qb = this.produitRepository.createQueryBuilder('produit');
    qb.innerJoin('commandes', 'c', 'c.produit_id=produit.produit_id').where(
      `c.client_id = ${id}`,
    );
    return qb;
  }
  async getProductById(id: number): Promise<ProduitEntity> {
    return await this.produitRepository.findOne({ where: { produit_id: id } });
  }
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