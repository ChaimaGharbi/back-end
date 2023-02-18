import { IsEmail, IsNotEmpty, IsString, IsNumber, IsEmpty, IsArray } from "class-validator";
import { ProduitEntity } from "../../produit/entities/produit.entity";


export class UsersubscribeDto {
    @IsEmail()
    @IsNotEmpty()
    email:string ;
 
    @IsString()
    @IsNotEmpty()
    mdp:string ;

    @IsNotEmpty()
    @IsString()
    adresse: string;

    @IsNotEmpty()
    @IsNumber()
    numTel: number;
}