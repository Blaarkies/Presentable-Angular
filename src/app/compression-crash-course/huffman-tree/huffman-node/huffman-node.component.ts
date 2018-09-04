import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BiDirectionEnum } from 'src/app/common/bi-direction.enum';
import { BehaviorSubject, Subject } from 'rxjs';
import { HuffmanCode } from 'src/app/common/interface';
import { takeUntil } from 'rxjs/operators';

@Component({
             selector: 'app-huffman-node',
             templateUrl: './huffman-node.component.html',
             styleUrls: ['./huffman-node.component.scss']
           })
export class HuffmanNodeComponent implements OnInit, OnDestroy {

  @Input() treePart: any;
  @Input() minInsertOrder$: BehaviorSubject<number>;
  @Input() selectedPath$: BehaviorSubject<string>;

  unsubscribe = new Subject<void>();

  public hasNestedLeftNode;
  public hasNestedRightNode;
  public leftNode;
  public rightNode;

  public highlightLeft;
  public highlightRight;
  public fadeOutLeft;
  public fadeOutRight;

  public BiDirectionEnum = BiDirectionEnum;

  constructor() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  ngOnInit() {
    this.hasNestedLeftNode = this.treePart[0][0] && this.treePart[0][1];
    this.hasNestedRightNode = this.treePart[1][0] && this.treePart[1][1];

    this.leftNode = this.treePart[0];
    this.rightNode = this.treePart[1];

    this.selectedPath$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(path => {
          this.highlightLeft = path.indexOf(this.leftNode.path) === 0;
          this.highlightRight = path.indexOf(this.rightNode.path) === 0;
        });

    this.minInsertOrder$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe(selectedInsertOrder => {
          this.fadeOutLeft = this.leftNode.insertOrder > selectedInsertOrder;
          this.fadeOutRight = this.rightNode.insertOrder > selectedInsertOrder;
        });
  }

  setSelectedPath(node: HuffmanCode) {
    this.selectedPath$.next((this.selectedPath$.value !== node.path) ? node.path : '');
  }
}
