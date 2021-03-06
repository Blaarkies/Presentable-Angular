import { Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
             selector: 'app-huffman-tree',
             templateUrl: './huffman-tree.component.html',
             styleUrls: ['./huffman-tree.component.scss',
                         '../../app.component.scss'],
           })
export class HuffmanTreeComponent {

  @Input() tree: any;
  @Input() minInsertOrder$: BehaviorSubject<number>;
  @Input() selectedPath$: BehaviorSubject<string>;

  MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

}
