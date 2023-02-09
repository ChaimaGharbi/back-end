import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";



export class addProduitDto{

    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    imgURL: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    @Type(() => Number)
    prix: number;

}