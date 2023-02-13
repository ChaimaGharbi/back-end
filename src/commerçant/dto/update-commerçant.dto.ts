import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateCommercantDto {
  @IsString()
  @IsOptional()
  name: string;
  @IsNotEmpty()
  @IsOptional()
  firstname: string;
  @IsOptional()
  @IsStrongPassword()
  mdp: string;
  @IsOptional()
  address: string;
  @IsPhoneNumber()
  @IsOptional()
  numTel: number;
}
