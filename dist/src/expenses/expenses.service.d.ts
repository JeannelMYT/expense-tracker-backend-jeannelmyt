import { Expense } from '../entities/expense.entity';
import { ExpenseDto } from './dto/expense.dto';
import { UsersService } from '../users/users.service';
export declare class ExpensesService {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createExpenseDto: ExpenseDto): Promise<{
        message: string;
    }>;
    getExpense(expenseId: number): Promise<Expense>;
    getAllExpenses(userId: number): Promise<Expense[]>;
    update(expenseId: number, updateExpenseDto: ExpenseDto): Promise<{
        message: string;
    }>;
    delete(id: number): Promise<{
        message: string;
    }>;
}
