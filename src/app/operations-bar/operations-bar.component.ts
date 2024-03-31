import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorScheme } from '../model/colorscheme';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'operations-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operations-bar.component.html',
  styleUrl: './operations-bar.component.css'
})
export class OperationsBarComponent {

  @Input()
  transferDialog: TransferDialogComponent;

  @Input()
  colorScheme: ColorScheme;

  @Input()
  currentUser: string;

  showTransferDialog() {
    this.transferDialog.resetComponentState();
    this.transferDialog.show();
  }
}