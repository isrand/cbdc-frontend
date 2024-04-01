import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorScheme } from '../model/colorscheme';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';

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
  requestDialog: RequestDialogComponent;

  @Input()
  colorScheme: ColorScheme;

  @Input()
  currentUser: string;

  showTransferDialog() {
    if (this.requestDialog.show) {
      this.requestDialog.hide();
    }
    this.transferDialog.resetComponentState();
    this.transferDialog.show();
  }

  showRequestDialog() {
    if (this.transferDialog.show) {
      this.transferDialog.hide();
    }
    this.requestDialog.resetComponentState();
    this.requestDialog.show();
  }
}