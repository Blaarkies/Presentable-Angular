import { Component, Input } from '@angular/core';
import { EntropyExample } from 'src/app/common/interfaces';

@Component({
             selector: 'app-entropy-info',
             templateUrl: './entropy-info.component.html',
             styleUrls: ['./entropy-info.component.scss'],
           })
export class EntropyInfoComponent {

  @Input() entropyObject: EntropyExample;

}
