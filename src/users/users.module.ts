import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ExpensesService } from 'src/expenses/expenses.service';
import { ExpensesModule } from 'src/expenses/expenses.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ExpensesService],
  imports: [forwardRef(() => ExpensesModule)],
  exports: [UsersService],
})
export class UsersModule {}
