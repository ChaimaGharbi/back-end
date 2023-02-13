import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommerçantService } from 'src/commerçant/commerçant.service';
import { Not, Repository } from 'typeorm';
import { addProduitDto } from './dto/add-produit.dto';
import { updateProduitDto } from './dto/update-produit.dto';
import { ProduitEntity } from './entities/produit.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(ProduitEntity)
    private produitRepository: Repository<ProduitEntity>,
    private commercantService: CommerçantService,
  ) {}

  async gett(){
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


    async getProduitcommandee(){
        const sql = this.produitRepository.createQueryBuilder("produit");
        sql.innerJoin("commandes","c","c.produit_id=produit.produit_id")
        .innerJoin("client","cl","cl.client_id=c.client_id")
        return sql;
    }

}
