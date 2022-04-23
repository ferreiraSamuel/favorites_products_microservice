import { ProductsEntity } from './../../products/entities/produtcs.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClientInterface } from '../interfaces/client.interface';

@Entity({
  name: 'clients',
})
export class ClientEntity extends BaseEntity implements ClientInterface {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column({
    type: 'varchar',
    length: 256,
    unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: true,
  })
  name: string;
  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  password: string;

  @ManyToMany(() => ProductsEntity, { cascade: true })
  @JoinTable()
  favorites: ProductsEntity[];
}
