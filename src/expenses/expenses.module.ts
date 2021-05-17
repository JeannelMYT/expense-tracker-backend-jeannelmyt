import { forwardRef, Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService, UsersService],
  imports: [forwardRef(() => UsersModule)],
})
export class ExpensesModule {}
