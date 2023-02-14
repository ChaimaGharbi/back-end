import { IsNotEmpty,IsNumber } from 'class-validator';
export class AddCommandeDto {
    @IsNumber()
    @IsNotEmpty()
    client_id:number ;
 
    @IsNumber()
    @IsNotEmpty()
    produit_id:number ;
}