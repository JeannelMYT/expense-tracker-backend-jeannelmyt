import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Expense } from '../entities/expense.entity';
import { ExpenseDto } from './dto/expense.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class ExpensesService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async create(createExpenseDto: ExpenseDto) {
    const expense = Expense.create(createExpenseDto);
    const user = await this.usersService.findById(createExpenseDto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    expense.user = user;
    await expense.save();
    return {
      message: 'Expense Created!',
    };
  }

  async getExpense(expenseId: number) {
    const expense = await Expense.findOne(expenseId);

    //Remove data user doesn't need to see before returning user details
    delete expense.createdAt;
    delete expense.updatedAt;

    return expense;
  }

  async getAllExpenses(userId: number) {
    const user = await this.usersService.findById(userId);
    let expenses = await Expense.find({ where: { user } });

    //Remove data user doesn't need to see before returning user details
    expenses = expenses.map((expense) => {
      delete expense.createdAt;
      delete expense.updatedAt;
      return expense;
    });

    return expenses;
  }

  async update(expenseId: number, updateExpenseDto: ExpenseDto) {
    let expense = await Expense.findOne(expenseId);

    expense.expense = updateExpenseDto.expense;
    expense.date = updateExpenseDto.date;
    expense.amount = updateExpenseDto.amount;

    await expense.save();

    return {
      message: 'Expense Updated!',
    };
  }

  async delete(id: number) {
    await Expense.delete(id);
    return {
      message: 'Expense deleted!',
    };
  }
}
