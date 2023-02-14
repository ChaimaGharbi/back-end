import { IsEmail, IsNotEmpty ,IsString ,IsNumber } from 'class-validator';


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