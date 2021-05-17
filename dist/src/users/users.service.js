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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const bcrypt = require("bcryptjs");
const expenses_service_1 = require("../expenses/expenses.service");
let UsersService = class UsersService {
    constructor(expensesService) {
        this.expensesService = expensesService;
    }
    async create(createUserDto) {
        const usernameExists = await user_entity_1.User.findOne({
            where: {
                username: createUserDto.username,
            },
        });
        if (usernameExists) {
            throw new common_1.HttpException('Username already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const emailExists = await user_entity_1.User.findOne({
            where: {
                email: createUserDto.email,
            },
        });
        if (emailExists) {
            throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = user_entity_1.User.create(createUserDto);
        await user.save();
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }
    async getUserDetails(id) {
        const user = await this.findById(id);
        delete user.password;
        delete user.createdAt;
        delete user.updatedAt;
        return user;
    }
    async findById(id) {
        return await user_entity_1.User.findOne(id);
    }
    async findByUsername(username) {
        return await user_entity_1.User.findOne({
            where: {
                username,
            },
        });
    }
    async update(id, updateUserDto) {
        let user = await this.findById(id);
        if (!(await (user === null || user === void 0 ? void 0 : user.validatePassword(updateUserDto.password)))) {
            throw new common_1.UnauthorizedException('Invalid existing password');
        }
        if (user.username != updateUserDto.username) {
            const usernameExists = await user_entity_1.User.findOne({
                where: {
                    username: updateUserDto.username,
                },
            });
            if (usernameExists) {
                throw new common_1.HttpException('Username already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (user.email != updateUserDto.email) {
            const emailExists = await user_entity_1.User.findOne({
                where: {
                    email: updateUserDto.email,
                },
            });
            if (emailExists) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        user.username = updateUserDto.username;
        user.email = updateUserDto.email;
        if (updateUserDto.newPassword) {
            user.password = await bcrypt.hash(updateUserDto.newPassword, 8);
        }
        else {
            user.password = await bcrypt.hash(updateUserDto.password, 8);
        }
        await user.save();
        return {
            message: 'Details Updated!',
        };
    }
    async delete(id, deleteUserDto) {
        let user = await this.findById(id);
        if (!(await (user === null || user === void 0 ? void 0 : user.validatePassword(deleteUserDto.password)))) {
            throw new common_1.UnauthorizedException('Invalid existing password');
        }
        const expenses = this.expensesService.getAllExpenses(id);
        (await expenses).forEach((expense) => {
            this.expensesService.delete(expense.id);
        });
        await timeout(1000);
        await user_entity_1.User.delete(id);
        return {
            message: 'Account Deleted!',
        };
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.forwardRef(() => expenses_service_1.ExpensesService))),
    __metadata("design:paramtypes", [expenses_service_1.ExpensesService])
], UsersService);
exports.UsersService = UsersService;
const timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
};
//# sourceMappingURL=users.service.js.map