import { Controller } from '@nestjs/common';
import { CommerçantService } from './commerçant.service';
import { Body, Get, Post, Put, Param,Delete } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { ProduitService } from 'src/produit/produit.service';

@Controller('commercant')
export class CommerçantController {
    constructor(
        private produitService : ProduitService,
        private commercantService: CommerçantService){}


    @Get('commandes/:id')
    async getcommandes(
        @Param('id',ParseIntPipe) id :number
    ){    
        const sql= await this.produitService.getProduitcommandee();
        
        sql.where(`commerçantCommerçantId = ${id}`);

        return sql.getMany();
    }




}
