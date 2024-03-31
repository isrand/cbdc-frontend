import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'transaction-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.css'
})
export class TransactionDetailComponent {

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
  debtor: string;

  @Input()
  message: string;
}
