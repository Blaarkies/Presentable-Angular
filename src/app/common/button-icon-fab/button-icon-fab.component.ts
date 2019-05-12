import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
             selector: 'app-button-icon-fab',
             templateUrl: './button-icon-fab.component.html',
             styleUrls: ['./button-icon-fab.component.scss']
           })
export class ButtonIconFabComponent {

  @Input() size: string = 'medium';
  @Input() color: string = 'primary';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
