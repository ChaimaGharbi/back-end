import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommerçantEntity } from '../../commerçant/entities/commerçant.entity';

@Entity('produit')
export class ProduitEntity {
  @PrimaryGeneratedColumn()
  produit_id: number;
  @Column()
  nom: string;
  @Column()
  imgURL: string;
  @Column()
  description: string;
  @Column()
  prix: number;
  @ManyToOne((type) => CommerçantEntity, (commerçant) => commerçant.produits, {
    cascade: true,
  })
  commerçant: CommerçantEntity;
}
