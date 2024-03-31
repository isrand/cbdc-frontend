import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorScheme } from '../model/colorscheme';

@Component({
  selector: 'overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

  @Input()
  owner: string;

  @Input()
  dean: string;

  @Input()
  balance: number;

  @Input()
  colorScheme: ColorScheme;

  copyDEANToClipboard(dean: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = dean.replace(' ', '');
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    alert('DEAN copied to clipboard');
  }
}
