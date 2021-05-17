"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const expense_entity_1 = require("../entities/expense.entity");
const users_service_1 = require("../users/users.service");
let ExpensesService = class ExpensesService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createExpenseDto) {
        const expense = expense_entity_1.Expense.create(createExpenseDto);
        const user = await this.usersService.findById(createExpenseDto.userId);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        expense.user = user;
        await expense.save();
        return {
            message: 'Expense Created!',
        };
    }
    async getExpense(expenseId) {
        const expense = await expense_entity_1.Expense.findOne(expenseId);
        delete expense.createdAt;
        delete expense.updatedAt;
        return expense;
    }
    async getAllExpenses(userId) {
        const user = await this.usersService.findById(userId);
        let expenses = await expense_entity_1.Expense.find({ where: { user } });
        expenses = expenses.map((expense) => {
            delete expense.createdAt;
            delete expense.updatedAt;
            return expense;
        });
        return expenses;
    }
    async update(expenseId, updateExpenseDto) {
        let expense = await expense_entity_1.Expense.findOne(expenseId);
        expense.expense = updateExpenseDto.expense;
        expense.date = updateExpenseDto.date;
        expense.amount = updateExpenseDto.amount;
        await expense.save();
        return {
            message: 'Expense Updated!',
        };
    }
    async delete(id) {
        await expense_entity_1.Expense.delete(id);
        return {
            message: 'Expense deleted!',
        };
    }
};
ExpensesService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], ExpensesService);
exports.ExpensesService = ExpensesService;
//# sourceMappingURL=expenses.service.js.map