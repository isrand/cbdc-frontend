import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TokenSDKTransaction } from '../model/token.sdk.transaction';
import { TransactionCardComponent } from '../transaction-card/transaction-card.component';
import { ColorScheme } from '../model/colorscheme';

@Component({
  selector: 'transaction-list',
  standalone: true,
  imports: [CommonModule, TransactionCardComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  expanded = true;


  @Input()
  colorScheme: ColorScheme;

  @Output('reloadData') reloadData: EventEmitter<any> = new EventEmitter();


  toggleExpandTransactions() {
    this.expanded = !this.expanded;
  }

  @Input()
  transactions: TokenSDKTransaction[];

  @Input()
  activeAccountId: string;

  onRefreshClick() {
    this.reloadData.emit();
  }
}
