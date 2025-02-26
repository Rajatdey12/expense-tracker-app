import { Component } from "@angular/core";
import { AppService } from '../app.service';

@Component({
  selector: "expense-list",
  templateUrl: "./expenseList.component.html",
  styleUrls: ["./expenseList.component.scss"]
})
export class ExpenseList {

  expenses = [{item: 'Sample', amount: 100}];

  constructor(public appService: AppService) {

  }

  deleteExpense(index: number) {
    this.appService.deleteExpense(index);
  }
  
}
