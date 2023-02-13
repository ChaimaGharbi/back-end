import { Controller, ParseIntPipe } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { Body, Get, Post, Put, Param, Delete } from '@nestjs/common/decorators';
import { addProduitDto } from './dto/add-produit.dto';
import { updateProduitDto } from './dto/update-produit.dto';

@Controller('produit')
export class ProduitController {
  constructor(private produitService: ProduitService) {}


  @Get()
  async gettt(){
    return await this.produitService.gett();
  }
  @Post('add/:id')

  async addProduit(
    @Body() newproduit: addProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.addProduit(id, newproduit);
  }

  @Delete(':id')
  async removeproduit(@Param('id', ParseIntPipe) id: number) {
    return await this.produitService.suppProduit(id);
  }

  @Get('commercant/:id')
  async consultProduit(@Param('id', ParseIntPipe) id: number) {
    return this.produitService.consultProduit(id);
  }

  @Put('edit/:id')
  async editProduit(
    @Body() newproduit: updateProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.editProduit(id, newproduit);
  }
}
