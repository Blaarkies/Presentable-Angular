import {Component, Input} from '@angular/core';
import {BiDirectionEnum} from "../../../../common/bi-direction.enum";

@Component({
  selector: 'app-node-connecter',
  templateUrl: './node-connecter.component.html',
  styleUrls: ['../huffman-node.component.scss']
})
export class NodeConnecterComponent {

  @Input() direction: BiDirectionEnum;
  @Input() pathText: string;
  @Input() transparent: boolean;

  public BiDirectionEnum = BiDirectionEnum;

}
