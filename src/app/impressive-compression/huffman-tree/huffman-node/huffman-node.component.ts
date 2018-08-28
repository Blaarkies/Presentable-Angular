import {Component, Input, OnInit} from '@angular/core';
import {BiDirectionEnum} from "../../../common/bi-direction.enum";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-huffman-node',
  templateUrl: './huffman-node.component.html',
  styleUrls: ['./huffman-node.component.scss']
})
export class HuffmanNodeComponent implements OnInit {

  @Input() treePart: any;
  @Input() minInsertOrder$: BehaviorSubject<number>;

  public hasNestedLeftNode;
  public hasNestedRightNode;
  public leftNode;
  public rightNode;

  public BiDirectionEnum = BiDirectionEnum;

  constructor() {
  }

  ngOnInit() {
    this.hasNestedLeftNode = this.treePart[0][0] && this.treePart[0][1];
    this.hasNestedRightNode = this.treePart[1][0] && this.treePart[1][1];

    this.leftNode = this.treePart[0];
    this.rightNode = this.treePart[1];
  }

}
