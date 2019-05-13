import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material';

@Component({
             selector: 'app-toggle-slider',
             templateUrl: './toggle-slider.component.html',
             styleUrls: ['./toggle-slider.component.scss']
           })
export class ToggleSliderComponent {

  @Input() isChecked: boolean = false;
  @Input() isDisabled: boolean;
  @Input() tooltipText: string;
  @Input() label: string;

  @Output() change = new EventEmitter<boolean>();

  onChange($event: MatSlideToggleChange) {
    this.isChecked = $event.checked;
    this.change.emit($event.checked);
  }
}
