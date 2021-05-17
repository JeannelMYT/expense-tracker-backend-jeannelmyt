import { IsNotEmpty } from 'class-validator';

export class ExpenseDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  expense: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  date: string;
}
