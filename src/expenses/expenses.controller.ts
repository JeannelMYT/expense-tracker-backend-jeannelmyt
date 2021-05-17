import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpenseDto } from './dto/expense.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createExpenseDto: ExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getExpense/:expenseId')
  getExpense(@Param('expenseId') expenseId: number) {
    return this.expensesService.getExpense(+expenseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getAllExpenses/:userId')
  getAllExpenses(@Param('userId') userId: number) {
    return this.expensesService.getAllExpenses(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':expenseId')
  update(
    @Param('expenseId') expenseId: number,
    @Body() expenseDto: ExpenseDto,
  ) {
    return this.expensesService.update(+expenseId, expenseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':expenseId')
  delete(@Param('expenseId') expenseId: number) {
    return this.expensesService.delete(+expenseId);
  }
}
