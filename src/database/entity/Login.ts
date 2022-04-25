import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id_user!: number;

  @Column()
  date_login_user!: Date;
  
  @Column()
  username_user!: string;
}