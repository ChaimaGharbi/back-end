import { IsEmail, IsNotEmpty ,IsString  } from 'class-validator';


export class commercantLoginDto {
    @IsEmail()
    @IsNotEmpty()
    email:string ;
 
    @IsString()
    @IsNotEmpty()
    mdp:string ;

}