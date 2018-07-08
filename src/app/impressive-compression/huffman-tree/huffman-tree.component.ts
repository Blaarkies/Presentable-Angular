import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-huffman-tree',
  templateUrl: './huffman-tree.component.html',
  styleUrls: ['./huffman-tree.component.css',
    '../../app.component.scss'],
})
export class HuffmanTreeComponent implements OnInit {

  // @Input('tree') tree: any = [];
  // @Input('tilt') tilt: number;

  // notEnd = false;

  constructor() {
  }

  ngOnInit() {
  }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //       this.notEnd = this.tree && this.tree.length !== undefined;
  //     },
  //     100);
  // }

}
