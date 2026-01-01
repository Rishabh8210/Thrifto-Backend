import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateTransactionDetailsDto {
    @IsString()
    @IsOptional()
    description: string

    @IsNumber()
    @IsOptional()
    amount: number
}