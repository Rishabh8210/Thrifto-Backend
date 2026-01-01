import { Transactions } from 'src/transactions/entities/transaction.entity';
import { Wallets } from 'src/wallets/entities/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: 0 })
    totalAmount: number;

    @OneToMany(() => Wallets, (wallet) => wallet.user, { eager: true })
    wallets: Wallets[]

    @OneToMany(() => Transactions, (transaction) => transaction.user, {eager: true})
    transactions: Transactions[]

    @Column({name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date

    @Column({name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP',})
    updatedAt: Date
}