import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
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
}
