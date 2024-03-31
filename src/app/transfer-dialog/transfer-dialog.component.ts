import { Component, EventEmitter, Input, Output, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAccountBankName, getIntermediaryBankURL } from '../config';
import { HttpClient } from '@angular/common/http';

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

  public constructor(private http: HttpClient) {}

  @Input()
  self: string = '';

  recipient: string = '';
  amount: number = 0;
  bankName: string = '';
  concept: string = '';

  async doTransfer() {
    this.transferButtonEnabled = false;
    const requestBody = {
      debtor: this.self,
      instructedAmount: {
        currency: 'EUR',
        amount: Number(this.amount) * 100 // Token SDK deals with cents, not euros...
      },
      creditor: {
        intermediary: this.bankName,
        account: this.recipient
      },
      message: this.concept
    };

    console.log(this.self);
    const debtorBankName = getAccountBankName(this.self);
    const intermediaryBankURL = getIntermediaryBankURL(debtorBankName);
    try {
      const response = await this.http.post(`${intermediaryBankURL}/api/v1/payments/digital-currency-transfer`, requestBody).toPromise();
      
    } catch (error) {

    }

    this.reloadData.emit();
    this.transferButtonEnabled = true;
  }

  cancel() {

  }

}
