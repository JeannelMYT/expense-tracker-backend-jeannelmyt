import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Expense Tracker JeannelMYT is running!';
  }
}
