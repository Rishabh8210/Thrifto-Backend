import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDetailsDto } from './dtos/create-transaction.dto';
import { UpdateTransactionDetailsDto } from './dtos/update-transaction.dto';

@Controller('transactions')
export class TransactionsController {
    constructor(
        private readonly transactionService: TransactionsService
    ) {}

    @Get('id')
    async getTransactionDetailById(
        @Param() id:number
    ) {
        if(!id){
            throw new BadRequestException("Transaction ID is required")
        }

        return await this.transactionService.get(+id);  
    }

    @Post()
    async createTransactionDetails(
        @Body() transactionDetails: CreateTransactionDetailsDto
    ) {
        return await this.transactionService.create(transactionDetails);
    }

    @Patch('id')
    async updateTransactionDetails(
        @Param() id: number,
        @Query() updatedTransactionDetails: UpdateTransactionDetailsDto
    ){
        if(!id){
            throw new BadRequestException("Transaction ID is required")
        }

        return await this.transactionService.update(+id, updatedTransactionDetails);
    }

    @Delete('id')
    async deleteTransactionDetails(
        @Param() id: number
    ) {
        if(!id){
            throw new BadRequestException("Transaction ID is required")  
        }

        return await this.transactionService.delete(+id);
    }
}
