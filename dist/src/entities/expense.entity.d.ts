import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class Expense extends BaseEntity {
    id: number;
    user: User;
    expense: string;
    amount: number;
    date: string;
    createdAt: Date;
    updatedAt: Date;
}
