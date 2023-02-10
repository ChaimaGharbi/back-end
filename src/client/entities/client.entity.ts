import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Optional } from '@nestjs/common';
import { ProduitEntity } from '../../produit/entities/produit.entity';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  client_id: number;
  @Column()
  email: string;
  @Column()
  name: string;
  @Column()
  firstname: string;
  @Column()
  mdp: string;
  @Column()
  adresse: string;
  @Column()
  numTel: number;
  @ManyToMany((type) => ProduitEntity)
  @JoinTable({
    name: 'commandes',
    joinColumns: [{ name: 'client_id' }],
    inverseJoinColumns: [{ name: 'produit_id' }],
  })
  @Optional()
  commandes: ProduitEntity[];
  @ManyToMany((type) => ProduitEntity)
  @JoinTable({
    name: 'favoris',
    joinColumns: [{ name: 'client_id' }],
    inverseJoinColumns: [{ name: 'produit_id' }],
  })
  @Optional()
  favoris: ProduitEntity[];
}
