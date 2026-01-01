import { Users } from "src/users/entities/user.entity";
import { Wallets } from "src/wallets/entities/wallet.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    amount: number

    @ManyToOne(() => Wallets, (wallet) => wallet.transactions, { onDelete: 'CASCADE', onUpdate: 'CASCADE',nullable: false })
    wallet: Wallets

    @ManyToOne(() => Users, (user) => user.transactions, {onDelete: 'CASCADE', onUpdate: 'CASCADE',nullable: false})
    user: Users

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP',})
    updatedAt: Date
}