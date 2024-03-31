import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorScheme } from '../model/colorscheme';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'operations-bar',
  standalone: true,
  imports: [CommonModule, TransferDialogComponent],
  templateUrl: './operations-bar.component.html',
  styleUrl: './operations-bar.component.css'
})
export class OperationsBarComponent {
  @Output('toggleTransferDialogVisibility') toggleTransferDialogVisibility: EventEmitter<any> = new EventEmitter();

  @Input()
  colorScheme: ColorScheme;

  @Input()
  currentUser: string;

  showingTransferDialog = false;

  showTransferDialog() {
    this.toggleTransferDialogVisibility.emit();
  }
}