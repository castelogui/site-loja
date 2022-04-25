import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id_item!: number;

  @Column()
  nome_item!: string;

  @Column()
  description_item!: string;

  @Column()
  valor_item!: string;

  @Column()
  image_item!: string;

  @Column()
  tipo_item!: string;

  @Column()
  date_created_item!: Date;

  @Column()
  date_updated_item!: Date;
}
