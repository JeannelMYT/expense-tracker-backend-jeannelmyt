import { ExpensesService } from './expenses.service';
import { ExpenseDto } from './dto/expense.dto';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(createExpenseDto: ExpenseDto): Promise<{
        message: string;
    }>;
    getExpense(expenseId: number): Promise<import("../entities/expense.entity").Expense>;
    getAllExpenses(userId: number): Promise<import("../entities/expense.entity").Expense[]>;
    update(expenseId: number, expenseDto: ExpenseDto): Promise<{
        message: string;
    }>;
    delete(expenseId: number): Promise<{
        message: string;
    }>;
}
