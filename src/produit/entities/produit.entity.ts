import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CommerçantEntity } from '../../commerçant/entities/commerçant.entity';
import { CommandesEntity } from "../../commandes/entities/commandes.entity";

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
  @Column()
  stock: number;
  @ManyToOne((type) => CommerçantEntity, (commerçant) => commerçant.produits ,{
    cascade: true,
  })
  commerçant: CommerçantEntity;
  @OneToMany(() => CommandesEntity, commande => commande.produit, { cascade: true })
  commandes: CommandesEntity[];
}
