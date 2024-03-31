import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

@Component({
  selector: 'transaction-card',
  standalone: true,
  imports: [CommonModule,
  TransactionDetailComponent],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.css'
})
  export class TransactionCardComponent {

  showDetail = false;

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  @Input()
  activeAccountId: string;

  @Input()
  id: string;

  @Input()
  amount: number;

  @Input()
  timestamp: string;

  @Input()
  vendor: string;

  @Input()
  creditor: string;

  @Input()
  message: string;

  @Input()
  debtor: string;
}
