import { Component, Input, OnInit } from "@angular/core";
import { AppService, IExpense } from '../app.service';

@Component({
  selector: "expense-form",
  templateUrl: "./expenseForm.component.html",
  styleUrls: ["./expenseForm.component.scss"]
})
export class ExpenseForm {

  item: string = '';
  amount: number | null = null;

  constructor(public appService: AppService) { }

  addExpense() {
    if (this.item && this.amount !== null) {
      this.appService.addExpense({ item: this.item, amount: this.amount });
      this.item = '';
      this.amount = null;
    }
  }
}
