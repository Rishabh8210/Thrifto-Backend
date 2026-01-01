import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Transactions } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDetails } from './dtos/create-transaction.dto';
import { Users } from 'src/users/entities/user.entity';
import { Wallets } from 'src/wallets/entities/wallet.entity';
@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,

        @InjectRepository(Wallets)
        private readonly walletRepository: Repository<Wallets>,

        @InjectRepository(Transactions)
        private readonly transactionRepository: Repository<Transactions>
    ){}

    async create(transactionDetails: CreateTransactionDetails) {
        try{
            const user = await this.userRepository.findOne({
                where:{
                    id: transactionDetails.userId
                }
            })

            if(!user){
                throw new NotFoundException("User not found")
            }

            const wallet = await this.walletRepository.findOne({
                where: {
                    id: transactionDetails.walletId
                }
            })

            if(!wallet){
                throw new NotFoundException("Wallet not found")
            }

            const transaction = {
                ...transactionDetails, 
                user,
                wallet
            }

            const transactionResponse = await this.transactionRepository.create(transaction)
            return await this.transactionRepository.save(transactionResponse);  
        } catch(error){
            throw new InternalServerErrorException("Error: Failed to create transaction details")
            console.log("Error: Something went wrong in the repository");
        }
    }

    async get(transactionId: number) {
        try {
            const transaction = await this.transactionRepository.findOne({
                where: {
                    id: transactionId
                }
            })

            if(!transaction){
                throw new NotFoundException("Transaction not found");
            }

            return transaction;
        } catch (error) {
            throw new InternalServerErrorException("Error: Failed to get transaction details")
            console.log("Error: Something went wrong, Please went wrong")
        }
    }

    // async getAllTransaction(transactionFilter: FindTransactionDto){

    // }
}
