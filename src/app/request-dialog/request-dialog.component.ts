import { Component, EventEmitter, HostListener, Injectable, Input, Output, importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { getAccountBankName, getAccountIdFromDEAN, getIntermediaryBankURL } from '../config';
import { HttpClient } from '@angular/common/http';
import { ColorScheme } from '../model/colorscheme';

@Component({
  selector: 'request-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request-dialog.component.html',
  styleUrl: './request-dialog.component.css',
})
export class RequestDialogComponent {

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
