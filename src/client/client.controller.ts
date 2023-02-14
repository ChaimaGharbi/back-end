import { Controller, Get, Param, Put } from '@nestjs/common';
import { ProduitService } from 'src/produit/produit.service';
import { ClientService } from './client.service';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('client')

export class ClientController {
    constructor(
        private produitService: ProduitService,
        private clientService: ClientService,
        
    ) { }


    @Get('client/commandes/:id')
    async getCommandes(
        @Param('id', ParseIntPipe) id: number
    ) {
        const sql = await this.produitService.consultCommandeClient(id);
        return sql.getMany();
    }
    @Put('client/favourites/:id/:produit')
    async editListOfFavourites(
        @Param('id', ParseIntPipe) id: number,
        @Param('produit', ParseIntPipe) produitid: number
    ) {
        
        const produit = await this.produitService.getProductById(produitid)
        return await this.clientService.addProductToFavourites(id, produit);
    }
}