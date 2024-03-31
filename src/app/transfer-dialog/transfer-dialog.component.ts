import { Component, EventEmitter, HostListener, Injectable, Input, Output, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAccountBankName, getAccountIdFromDEAN, getIntermediaryBankURL } from '../config';
import { HttpClient } from '@angular/common/http';
import { ColorScheme } from '../model/colorscheme';

@Component({
  selector: 'transfer-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer-dialog.component.html',
  styleUrl: './transfer-dialog.component.css',
})
export class TransferDialogComponent {

  @Output('reloadData') reloadData: EventEmitter<any> = new EventEmitter();

  transferButtonEnabled = true;
  waiting = false;
  done = false;
  showComponent = false;

  public constructor(private http: HttpClient) {}

  @Input()
  colorScheme: ColorScheme;

  @Input()
  self: string = '';

  recipient: string = '';
  amount: number;
  message: string = '';

  async doTransfer() {
    this.done = false;
    this.waiting = true;
    this.transferButtonEnabled = false;

    const accountId = getAccountIdFromDEAN(this.recipient);
    const creditorBankName = getAccountBankName(accountId);

    const requestBody = {
      debtor: this.self,
      instructedAmount: {
        currency: 'EUR',
        amount: Number(this.amount) * 100 // Token SDK deals with cents, not euros...
      },
      creditor: {
        intermediary: creditorBankName,
        account: accountId
      },
      message: this.message
    };

    const debtorBankName = getAccountBankName(this.self);
    const intermediaryBankURL = getIntermediaryBankURL(debtorBankName);
    try {
      await this.http.post(`${intermediaryBankURL}/api/v1/payments/digital-currency-transfer`, requestBody).toPromise();
    } catch (error) {

    }
    this.reloadData.emit();
    this.transferButtonEnabled = true;
    this.waiting = false;
    this.done = true;
  }
  
  show() {
    this.showComponent = true;
  }

  hide() {
    this.showComponent = false;
  }

  // reset the component to the main state
  resetComponentState() {
    this.transferButtonEnabled = true;
    this.done = false;
    this.waiting = false;
  }

  @HostListener('document:keypress', ['$event'])
  async submitForm (event: KeyboardEvent) {
    if (this.showComponent && this.recipient && this.amount && !this.done && !this.waiting && event.key === 'Enter') {
      this.doTransfer();
    }
  }
}
