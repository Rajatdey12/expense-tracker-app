# Expense Tracker

## Environment 

- Angular CLI Version: 15.2.8
- Angular Core Version: 15.2.8
- Default Port: 8000

## Application Demo:

![](https://hrcdn.net/s3_pub/istreet-assets/H9zCHDkMZ-IfM-LoxrzekQ/expenseTracker.gif)

## Functionality Requirements

The module has the following functionalities:

- The module has 2 components:
  - `ExpenseForm` component
  - `ExpenseList` component.

- The app has a service named `AppService` which is used to store the list of expenses globally. The interface for an expense has been defined in this file having the following structure:

```
  interface IExpense {
    item: string;
    amount: number;
  }
```

- In the `ExpenseForm` component -
  - There are 2 inputs: `Item` and `Amount`. Both are initially empty.
  - Clicking on the `Submit` button adds the expense in the `AppService`.
  - After addition, both the input values are reset.
  - If either of the fields is empty, `Submit` button is disabled and cannot be clicked.
  - Amount can be negative or positive: a negative amount denotes a debit and a positive amount denotes a credit.
  - Reactive forms should not be used. The question expects to handle `Click` event on the `Submit` button. 

- In the `ExpenseList` component -
  - Render all the expenses that are saved in the `AppService`.
  - Each expense is rendered as a row in `<tr data-test-id="expense-list-item" />`.
  - The last row shows the total amount of all the expenses. 
  - Each expense row has a `Delete` button, clicking on which:
    - Deletes the expense from the list
    - Updates the total amount.

## Testing Requirements

The following data-test-id attributes are required in the component for the tests to pass:

- The item input: `item-input`
- The amount input: `amount-input`
- The submit button: `submit-button`
- Each expense row `<tr>`: `expense-list-item`
- Each delete button for every expense: `expense-list-delete`
- `<td>` containing the total expense amount: `total-expense`.

## Project Specifications

**Read-only Files**
- src/app/app.component.spec.ts

**Commands**

- run:

```bash
npm start
```

- install:

```bash
npm install
```

- test:

```bash
npm test
```
