import { IsNotEmpty,IsNumber } from 'class-validator';
export class AddFavorisDto {
    @IsNumber()
    @IsNotEmpty()
    client_id:number ;
 
    @IsNumber()
    @IsNotEmpty()
    produit_id:number ;
}