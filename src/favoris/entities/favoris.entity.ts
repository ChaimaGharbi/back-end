import { Entity, PrimaryColumn, ManyToMany } from 'typeorm';

@Entity('favoris')
export class FavorisEntity {
  @PrimaryColumn({ name: 'client_id' })
  client_id: number;

  @PrimaryColumn({ name: 'produit_id' })
  produit_id: number;
}
