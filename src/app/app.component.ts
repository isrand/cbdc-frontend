import { CommonModule, NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { getAccount, getAccountBankName, getColorScheme, getIntermediaryBankURL } from './config';
import { Account } from './model/account';
import { BankServerResponse } from './model/bank.server.response';
import { ColorScheme } from './model/colorscheme';
import { TokenSDKTransaction } from './model/token.sdk.transaction';
import { OperationsBarComponent } from './operations-bar/operations-bar.component';
import { OverviewComponent } from './overview/overview.component';
import { TransactionCardComponent } from './transaction-card/transaction-card.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransferDialogComponent } from './transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    TransactionCardComponent,
    TransactionListComponent,
    OverviewComponent,
    OperationsBarComponent,
    TransferDialogComponent,
    NgForOf,
  ],
  standalone: true
})
export class AppComponent {

  account: Account;
  accountTransactions: TokenSDKTransaction[];
  balanceAsString = '';

  // Bank UI color scheme
  colorScheme: ColorScheme;

  transferDialogVisible = false;

  public async reloadData(accountName: string) {
    await this.loadAccountInformation(accountName);
  }

  public constructor(private http: HttpClient) {
    this.colorScheme = getColorScheme('ING');
    this.account = getAccount('alice');
    this.getAccountTransactions(this.account.id).then((val) => {
      this.accountTransactions = val;
    });
    this.getAccountBalance(this.account.id).then((val) => {
      this.account.balance = val;
      this.balanceAsString = (this.account.balance / 100).toString();
      if (this.balanceAsString.indexOf('.') === -1) {
        this.balanceAsString += '.00';
      }
    });
  }

  toggleTransferDialogVisibility() {
    this.transferDialogVisible = !this.transferDialogVisible;
  }


  @HostListener('document:keypress', ['$event'])
  async changeColorScheme(event: KeyboardEvent) {
    switch(event.key) {
      case '[':
        this.colorScheme = getColorScheme('ING');
        await this.loadAccountInformation('alice');
        break;
      case ']':
        this.colorScheme = getColorScheme('ING');
        await this.loadAccountInformation('bob');
        break;
      case '{':
        this.colorScheme = getColorScheme('ABN');
        await this.loadAccountInformation('carlos');
        break;
      case '}':
        this.colorScheme = getColorScheme('ABN');
        await this.loadAccountInformation('dan');
        break;
      case '\'':
        this.colorScheme = getColorScheme('ING');
        await this.loadAccountInformation('bank1-mca');
        break;
      case '\\':
        this.colorScheme = getColorScheme('ABN');
        await this.loadAccountInformation('bank2-mca');
        break;
    }
  }

  async getAccountTransactions(accountName: string) {
    const bankName = getAccountBankName(accountName);
    const bankAddress = getIntermediaryBankURL(bankName);
    try {
      const transactions: BankServerResponse = <BankServerResponse> await this.http.get(`${bankAddress}/api/v1/accounts/${accountName}/transactions`).toPromise();
      const tokenSDKTransactions: TokenSDKTransaction[] = [];
  
      for (const transaction of transactions.payload) {
        tokenSDKTransactions.push(transaction as TokenSDKTransaction);
      }
  
      return tokenSDKTransactions.reverse();
    } catch (error) {
      return [];
    }
  }

  async getAccountBalance(accountName: string): Promise<number> {
    const bankName = getAccountBankName(accountName);
    const bankAddress = getIntermediaryBankURL(bankName);

    try {
      const accountInformation: BankServerResponse = <BankServerResponse> await this.http.get(`${bankAddress}/api/v1/accounts/${accountName}`).toPromise();
      return accountInformation.payload.balance[0].amount;
    } catch (error) {
      return 0;
    }
  }

  async loadAccountInformation(name: string) {
    this.account = getAccount(name);
    await this.getAccountTransactions(this.account.id).then((val) => {
      this.accountTransactions = val;
    });
    await this.getAccountBalance(this.account.id).then((val) => {
      this.account.balance = val;
      this.balanceAsString = (this.account.balance / 100).toString();
      if (this.balanceAsString.indexOf('.') === -1) {
        this.balanceAsString += '.00';
      }
    });
  }
}
