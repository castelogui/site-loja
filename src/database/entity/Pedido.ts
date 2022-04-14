import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id_pedido!: number

    @Column()
    cliente_pedido!: string

    @Column()
    description_pedido!: string

    @Column()
    items_pedido!: string

    @Column()
    date_created_pedido!: Date

}
