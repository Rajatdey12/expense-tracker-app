import { Injectable } from '@angular/core';

export interface IExpense {
  item: string;
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class AppService {

  private expenses: IExpense[] = [];

  constructor() { }

  addExpense(expense: IExpense) {
    this.expenses.push(expense);
  }

  deleteExpense(index: number) {
    this.expenses.splice(index, 1);
  }

  getExpenses(): IExpense[] {
    return this.expenses;
  }

  getTotalExpense(): number {
    return this.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  }
}
