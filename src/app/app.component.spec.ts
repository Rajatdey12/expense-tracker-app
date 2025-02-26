import {TestBed, async, ComponentFixture, fakeAsync, flush} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppService, IExpense} from './app.service';
import { ExpenseList } from './expenseList/expenseList.component';
import { ExpenseForm } from './expenseForm/expenseForm.component';

const generateRandomString = () => {
  return (Math.random() + 1).toString(36).substring(7);
}

const generateRandomNumber = (isPositive = true) => {
  const randomNumber = Math.floor((Math.random() * 10000) + 1);
  return isPositive ? randomNumber : -randomNumber;
}

function generateMockExpenses(isPositive = true): IExpense {
  return {
    item: generateRandomString(),
    amount: generateRandomNumber(isPositive)
  }
}

const testIdList = {
  expenseForm: {
    itemInput: 'item-input',
    amountInput: 'amount-input',
    submitButton: 'submit-button'
  },
  expenseList: 'expense-list-item',
  expenseListDelete: 'expense-list-delete',
  totalExpense: 'total-expense'
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;

  let itemInput: HTMLInputElement, amountInput: HTMLInputElement, submitBtn: HTMLButtonElement, totalExpense: HTMLElement,
      expenseList:  NodeList, expenseListDelete: NodeList;

  const mockExpenses = [0,1,2,3].map(() => generateMockExpenses());
  const firstMock = mockExpenses[(Math.floor(Math.random() * mockExpenses.length))];

  async function getElements() {
    const itemInput = fixture.debugElement.nativeElement.querySelector(`[data-test-id = ${testIdList.expenseForm.itemInput}]`) as HTMLInputElement;
    const amountInput = fixture.debugElement.nativeElement.querySelector(`[data-test-id = ${testIdList.expenseForm.amountInput}]`) as HTMLInputElement;
    const submitBtn = fixture.debugElement.nativeElement.querySelector(`[data-test-id = ${testIdList.expenseForm.submitButton}]`) as HTMLButtonElement;
    const totalExpense = fixture.debugElement.nativeElement.querySelector(`[data-test-id = ${testIdList.totalExpense}]`) as HTMLElement;
    const expenseList = fixture.debugElement.nativeElement.querySelectorAll(`[data-test-id = ${testIdList.expenseList}]`) as NodeList;
    const expenseListDelete = fixture.debugElement.nativeElement.querySelectorAll(`[data-test-id = ${testIdList.expenseListDelete}]`) as NodeList;
    return {
      itemInput,
      amountInput,
      submitBtn,
      expenseList,
      expenseListDelete,
      totalExpense
    };
  }

  const reducer = (accumulator: number, item: IExpense) => {
    return (accumulator = accumulator + item.amount);
  }

 const getTotalExpense = (expenseList:  IExpense[]) => {
    return expenseList.reduce(reducer, 0).toFixed(0);
  }

  const detectChanges = async () => {
    await fixture.detectChanges();
    await fixture.whenStable();
    await fixture.whenStable();
    ({amountInput, expenseList, expenseListDelete, itemInput, submitBtn, totalExpense,} = (await getElements()));
  }

  async function inputFireEvent(control: HTMLInputElement, value: string) {
    control.value = value;
    control.dispatchEvent(new Event('change'));
    control.dispatchEvent(new Event('input'));
    await detectChanges();
  }

  async function fireEvent(control: HTMLElement | HTMLButtonElement | Node) {
    control.dispatchEvent(new Event('click'));
    await detectChanges();
  }

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ExpenseList,
        ExpenseForm
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [AppService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(async () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    await detectChanges();
  }));

  it('Initial login form is empty', fakeAsync(async () => {
    expect(itemInput.value).toBe('');
    expect(amountInput.value).toBe('');
    expect(submitBtn.disabled).toBeTruthy();
  }));

  it('Submit is disabled if item is empty', fakeAsync(async () => {
    await inputFireEvent(amountInput, firstMock.amount.toString());
    expect(submitBtn.disabled).toBeTruthy();
  }));

  it('Submit is disabled if amount is empty', fakeAsync(async () => {
    await inputFireEvent(itemInput, firstMock.item);
    expect(submitBtn.disabled).toBeTruthy();
  }));
  
  it('check controls are reset after sucessful add expense', fakeAsync(async () => {
    await inputFireEvent(itemInput, firstMock.item);
    await inputFireEvent(amountInput, firstMock.amount.toString());
    await fireEvent(submitBtn);
    expect(itemInput.value).toBe('');
    expect(amountInput.value).toBe('');
  }));

  it('Adding expenses to check it renders in the expense list or not', fakeAsync(async () => {
    for(let i= 0 ;i< mockExpenses.length;i++){
      const mock = mockExpenses[i];
      await inputFireEvent(itemInput, mock.item);
      await inputFireEvent(amountInput, mock.amount.toString());
      await fireEvent(submitBtn);

      const expense = expenseList[i];
      expect(expense.textContent).toMatch(mock.item);
      expect(expense.textContent).toMatch(mock.amount.toString());
    }
  }));

  it('check initial total expense should be 0', fakeAsync(async () => {
    expect(totalExpense.textContent).toBe('0');
  }));

  it('check total expense is calcuated right', fakeAsync(async () => {
    for(let i= 0 ;i< mockExpenses.length;i++){
      const mock = mockExpenses[i];
      await inputFireEvent(itemInput, mock.item);
      await inputFireEvent(amountInput, mock.amount.toString());
      await fireEvent(submitBtn);
    }
    const total = getTotalExpense(mockExpenses);
    expect(totalExpense.textContent).toBe(`${total}`);
  }));

  it('check total expense is calcuated right when added a positive and negative value', fakeAsync(async () => {
    
    const negativeMock = [0,1,2,3].map(() => generateMockExpenses(false));

    for(let i = 0 ;i< mockExpenses.length;i++){
      const mock = mockExpenses[i];
      await inputFireEvent(itemInput, mock.item);
      await inputFireEvent(amountInput, mock.amount.toString());
      await fireEvent(submitBtn);

      //negative
      const negative = negativeMock[i];
      await inputFireEvent(itemInput, negative.item);
      await inputFireEvent(amountInput, negative.amount.toString());
      await fireEvent(submitBtn);

    }
    const total = getTotalExpense([...mockExpenses,...negativeMock]);
    expect(totalExpense.textContent).toBe(`${total}`);
  }));

  it('check delete button is working or not', fakeAsync(async () => {

    for(let i = 0 ;i< mockExpenses.length;i++){
      const mock = mockExpenses[i];
      await inputFireEvent(itemInput, mock.item);
      await inputFireEvent(amountInput, mock.amount.toString());
      await fireEvent(submitBtn);

      const button = expenseListDelete[0];
      expect(button).toBeTruthy();
      await fireEvent(button);
    }
    expect(totalExpense.textContent).toBe(`${0}`);
  }));

  it('check delete button click, updates the total or not', fakeAsync(async () => {

    for(let i = 0 ;i< mockExpenses.length;i++){
      const mock = mockExpenses[i];
      await inputFireEvent(itemInput, mock.item);
      await inputFireEvent(amountInput, mock.amount.toString());
      await fireEvent(submitBtn);
    }

    var total = getTotalExpense(mockExpenses);
    expect(totalExpense.textContent).toBe(`${total}`);
    const button = expenseListDelete[0];
    expect(button).toBeTruthy();
    await fireEvent(button);

    total = getTotalExpense(mockExpenses.slice(1,mockExpenses.length));
    expect(totalExpense.textContent).toBe(`${total}`);
  }));

});