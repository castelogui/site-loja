import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user!: number;

  @Column()
  type_user!: string;

  @Column()
  first_name_user!: string;

  @Column()
  last_name_user!: string;

  @Column()
  contato_user!: string;

  @Column()
  endereco_user!: string;

  @Column()
  username_user!: string;

  @Column()
  password_user!: string;

  @Column()
  filhos_user!: string;

  @Column()
  date_created_user!: Date;

  @Column()
  date_updated_user!: Date;
}
