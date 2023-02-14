import { IsEmail, IsNotEmpty ,IsString  } from 'class-validator';


export class UserloginDto {
    @IsEmail()
    @IsNotEmpty()
    email:string ;
 
    @IsString()
    @IsNotEmpty()
    mdp:string ;

}