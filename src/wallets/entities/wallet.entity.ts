import { Transactions } from "src/transactions/entities/transaction.entity";
import { Users } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Wallets {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string

    @Column({ default: 0 })
    amount: number

    @Column()
    description: string

    @ManyToOne(() => Users, (user) => user.wallets, { onDelete: 'CASCADE', onUpdate: 'CASCADE',nullable: false })
    user: Users

    @OneToMany(() => Transactions, (transaction) => transaction.wallet, { onDelete: 'CASCADE', onUpdate: 'CASCADE',nullable: false })
    transactions: Transactions[]

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP',})
    updatedAt: Date
}