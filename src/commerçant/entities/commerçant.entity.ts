import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProduitEntity } from '../../produit/entities/produit.entity';

@Entity('commerçant')
export class CommerçantEntity {
  @PrimaryGeneratedColumn()
  commerçant_id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  mdp: string;
  @Column()
  'nom du service': string;
  @Column()
  salt: string;
  @Column()
  numTel: number;
   @OneToMany((type) => ProduitEntity, (produit) => produit.commerçant)
  produits: ProduitEntity[];
  
}
