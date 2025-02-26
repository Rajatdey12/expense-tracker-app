
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ExpenseForm } from './expenseForm/expenseForm.component';
import { ExpenseList } from './expenseList/expenseList.component';
import { AppService } from './app.service';
@NgModule({
  declarations: [
    AppComponent,
    ExpenseList,
    ExpenseForm
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
