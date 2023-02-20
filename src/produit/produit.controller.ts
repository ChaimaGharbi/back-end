import { Controller, ParseIntPipe, UseGuards } from '@nestjs/common';
import { Body, Param, Get, Patch, Post, Delete, Put, Headers } from "@nestjs/common/decorators";
import { ProduitEntity } from './entities/produit.entity';
import { ProduitService } from './produit.service';
import { addProduitDto } from './dto/add-produit.dto';
import { updateProduitDto } from './dto/update-produit.dto';
import { JwtAuthGuard } from 'src/client/guards/jwt-auth.guard';
import { IsClientGuard } from 'src/client/guards/isclient.guard';
import { IsCommercantGuard } from 'src/commerçant/guards/iscommercant.guard';

@Controller('produit')
export class ProduitController {
  constructor(private produitService: ProduitService) {}

  /*@UseGuards(JwtAuthGuard,IsClientGuard)
  @Get()
  async getAllProduits(): Promise<ProduitEntity[]> {
    return await this.produitService.getProduits();
  }*/
  @UseGuards(JwtAuthGuard,IsClientGuard)
  @Patch('command/:idClient/:idProduit')
  async CommanderProduit(
    @Param('idClient', ParseIntPipe) idClient: number,
    @Param('idProduit', ParseIntPipe) idProduit: number,
  ): Promise<ProduitEntity> {
    return await this.produitService.CommandProduit(idClient, idProduit);
  }

  //@UseGuards(IsCommercantGuard)
  @Post('add/:id') /** */ async addProduit(
    @Body() newproduit: addProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.addProduit(id, newproduit);
  }
  @Get(':id') async getProduit(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.gett(id);
  }
  //@UseGuards(IsCommercantGuard)
  @Delete(':id') /** */ async removeproduit(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.suppProduit(id);
  }

  //@UseGuards(IsCommercantGuard)
  @Get('commercant/:id') /** */ async consultProduit(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.produitService.consultProduit(id);
  }

  //@UseGuards(IsCommercantGuard)
  @Put('edit/:id') /** */ async editProduit(
    @Body() newproduit: updateProduitDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.produitService.editProduit(id, newproduit);
  }
}