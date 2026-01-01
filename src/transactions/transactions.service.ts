import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDetailsDto } from './dtos/create-transaction.dto';
import { Users } from 'src/users/entities/user.entity';
import { Wallets } from 'src/wallets/entities/wallet.entity';
import { UpdateTransactionDetailsDto } from './dtos/update-transaction.dto';
@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        @InjectRepository(Wallets)
        private readonly walletRepository: Repository<Wallets>,

        @InjectRepository(Transactions)
        private readonly transactionRepository: Repository<Transactions>
    ) { }

    async create(transactionDetails: CreateTransactionDetailsDto) {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: transactionDetails.userId
                }
            })

            if (!user) {
                throw new NotFoundException("User not found")
            }

            const wallet = await this.walletRepository.findOne({
                where: {
                    id: transactionDetails.walletId
                }
            })

            if (!wallet) {
                throw new NotFoundException("Wallet not found")
            }

            const transaction = {
                ...transactionDetails,
                user,
                wallet
            }

            const transactionResponse = await this.transactionRepository.create(transaction)
            return await this.transactionRepository.save(transactionResponse);
        } catch (error) {
            console.log("Error: Something went wrong in the repository");
            throw new InternalServerErrorException("Error: Failed to create transaction details")
        }
    }

    async get(transactionId: number) {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: {
                    id: transactionId
                }
            })

            if (!transaction) {
                throw new NotFoundException("Transaction not found");
            }

            return transaction;
        } catch (error) {
            console.log("Error: Something went wrong, Please went wrong")
            throw new InternalServerErrorException("Error: Failed to get transaction details")
        }
    }

    async update(transactionId: number, updatedTransactionDetails: UpdateTransactionDetailsDto) {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: {
                    id: transactionId
                }
            })

            if (!transaction) {
                throw new NotFoundException("No transaction detail found with this ID")
            }

            Object.assign(transaction, {
                ...(updatedTransactionDetails.amount !== undefined && {
                    amount: updatedTransactionDetails.amount,
                }),
                ...(updatedTransactionDetails.description !== undefined && {
                    description: updatedTransactionDetails.description,
                }),
            });

            await this.transactionRepository.save(transaction);
            return transaction;
        } catch (error) {
            console.log("Error: Something went wrong in the repository");
            throw new InternalServerErrorException("Error: Failed to update transaction details")
        }
    }

    async delete(transactionId: number) {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: {
                    id: transactionId
                }
            })

            if(!transaction){
                throw new NotFoundException("No transaction details found with this ID")
            }

            return await this.transactionRepository.remove(transaction);
        } catch (error) {
            console.log("Error: Something went wrong in the repository");
            throw new InternalServerErrorException("Error: Failed to delete transaction details")
        }
    }

    // async getAllTransaction(transactionFilter: FindTransactionDto){

    // }
}
