import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AddCommerçantDto {
  @IsString()
  @IsNotEmpty({
    message: 'Ce champs est obligatoire!',
  })
  name: string;
  @IsNotEmpty()
  @IsString()
  firstname: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsStrongPassword()
  mdp: string;
  @IsOptional()
  address: string;
  @IsPhoneNumber()
  @IsOptional()
  numTel: number;
}
