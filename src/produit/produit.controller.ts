import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Get, Patch, Post, Delete, Put } from '@nestjs/common/decorators';
import { ProduitEntity } from './entities/produit.entity';
import { ProduitService } from './produit.service';
import { addProduitDto } from './dto/add-produit.dto';
import { updateProduitDto } from './dto/update-produit.dto';

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

  @Get() /** */ async gettt() {
    return await this.produitService.gett();
  }

  @Post('add/:id') /** */ async addProduit(
    @Body() newproduit: addProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.addProduit(id, newproduit);
  }

  @Delete(':id') /** */ async removeproduit(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.suppProduit(id);
  }

  @Get('commercant/:id') /** */ async consultProduit(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.produitService.consultProduit(id);
  }

  @Put('edit/:id') /** */ async editProduit(
    @Body() newproduit: updateProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.editProduit(id, newproduit);
  }
}
