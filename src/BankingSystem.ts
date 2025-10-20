// 🏦 Banking System
// 🏧 Create a system where users can create accounts, deposit, withdraw, and check their balance.
//
// 1. Implement a function `createAccount` that adds a new account to the `accounts` array. It should return a `BankAccount` object.
// 2. Implement a function `processTransaction` that allows deposits and withdrawals and stores them in the transactions array. It should return a string.
// 3. Implement a function `getBalance` that returns the balance of a given account number.
// 4. Implement a function `getTransactionHistory` that returns the list of transactions for an account.
// 5. Implement a function `checkActiveStatus` that returns the active status of an account number.
// 6. Implement a function `closeAccount` that removes an account from the array and returns a confirmation string.

enum TransactionType {
  Deposit,
  Withdraw
}

type Transaction = {
  accountNo: number;
  amount: number;
  type: TransactionType;
};

type BankAccount = {
  accountNo: number;
  firstname: string;
  lastname: string;
  balance: number;
  isActive: boolean;
  transactions: Transaction[];
};

const accounts: BankAccount[] = [];

function createAccount(
  accountNo: number,
  firstname: string,
  lastname: string,
  initialDeposit: number,
  isActive: boolean = true
): BankAccount {
  const account: BankAccount = {
    accountNo,
    firstname,
    lastname,
    balance: initialDeposit,
    isActive,
    transactions: []
  };
  accounts.push(account);
  return account;
}

function processTransaction(
  accountNo: number,
  amount: number,
  transactionType: TransactionType
): string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  if (!account) return `Account not found`;

  if (!account.isActive) return `Account is inactive`;

  if (transactionType === TransactionType.Withdraw) {
    if (account.balance < amount) {
      return "Insufficient funds for withdrawal";
    }
    account.balance -= amount;
  } else if (transactionType === TransactionType.Deposit) {
    account.balance += amount;
  }

  account.transactions.push({
    accountNo,
    amount,
    type: transactionType
  });

  return `${amount} ${TransactionType[transactionType].toLowerCase()}ed into account number ${accountNo}`;
}

function getBalance(accountNo: number): number | string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  return account ? account.balance : "Account not found";
}

function getTransactionHistory(accountNo: number): Transaction[] | string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  return account ? account.transactions : "Account not found";
}

function checkActiveStatus(accountNo: number): boolean | string {
  const account = accounts.find(acc => acc.accountNo === accountNo);
  return account ? account.isActive : "Account not found";
}

function closeAccount(accountNo: number): string {
  const index = accounts.findIndex(acc => acc.accountNo === accountNo);
  if (index === -1) return "Account not found";
  accounts.splice(index, 1);
  return `Account number ${accountNo} closed`;
}

console.log(createAccount(1, "John", "Smith", 100));
console.log(processTransaction(1, 50, TransactionType.Deposit));
console.log(processTransaction(1, 20, TransactionType.Withdraw));
console.log(processTransaction(1, 500, TransactionType.Withdraw));
console.log(getBalance(1));
console.log(getTransactionHistory(1));
console.log(checkActiveStatus(1));
console.log(closeAccount(1));
