import inquirer from "inquirer";
// Bank Account class
class Bank_Account {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log("Amount SuccessFully Withdrawl");
            console.log(`You Withdrawl ${amount}$ Your Remaining Balance is ${this.balance}$`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    // Credit Money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1;
        }
        this.balance += amount;
        console.log("Amount SuccessFully Deposit");
        console.log(`You Withdrawl ${amount}$ Your Remaining Balance is ${this.balance}$`);
    }
    // Check Balance
    checkBalance() {
        console.log(`Your Current Balance is ${this.balance}`);
    }
}
class Customers {
    firstName;
    LastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, LastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.LastName = LastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
const accounts = [new Bank_Account(1001, 500), new Bank_Account(1002, 1000), new Bank_Account(1003, 1500)];
const customers = [new Customers("Abdul", "Rehman", "Male", 20, 3151091361, accounts[0]),
    new Customers("Fazal", "Hussain", "Male", 20, 3453091361, accounts[1]),
    new Customers("Imran", "Khan", "Male", 20, 3145291361, accounts[2])];
async function service() {
    while (true) {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter Your Account Number"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome ${customer.firstName} ${customer.LastName}\n`);
            const ans = await inquirer.prompt({
                name: `Select`,
                type: "list",
                message: "Enter Your Choice",
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            });
            switch (ans.Select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To Deposit"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const WithdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter The Amount To Deposit"
                    });
                    customer.account.withdraw(WithdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Bank Account SuccessFully Exit... ");
                    console.log("Thankyou For Banking With Us");
                    process.exit();
            }
        }
        else {
            console.log("Account Number Invalid");
        }
    }
}
service();
