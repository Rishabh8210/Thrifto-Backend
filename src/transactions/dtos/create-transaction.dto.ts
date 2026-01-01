import { IsNumber, IsString } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateTransactionDetailsDto {
    @IsString()
    description: string

    @IsNumber()
    amount: number

    @IsNumber()
    userId: number

    @IsNumber()
    walletId: number
}
