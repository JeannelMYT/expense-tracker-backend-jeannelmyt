import { BaseEntity } from 'typeorm';
import { Expense } from './expense.entity';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    expenses: Expense[];
    validatePassword(password: string): Promise<boolean>;
}
