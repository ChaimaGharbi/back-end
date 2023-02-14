import { Controller } from '@nestjs/common';
import { Body, Param, Get, Patch } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitService } from './produit.service';

@Controller('produit')
export class ProduitController {
  constructor(private produitService: ProduitService) {}
  @Get()
  async getAllProduits(): Promise<ProduitEntity[]> {
    return await this.produitService.getProduits();
  }
  @Patch('command/:idClient/:idProduit')
  async CommanderProduit(
    @Param('idClient', ParseIntPipe) idClient: number,
    @Param('idProduit', ParseIntPipe) idProduit: number,
  ): Promise<ProduitEntity> {
    return await this.produitService.CommandProduit(idClient, idProduit);
  }
}
