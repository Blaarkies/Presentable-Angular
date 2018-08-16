import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-huffman-tree',
  templateUrl: './huffman-tree.component.html',
  styleUrls: ['./huffman-tree.component.scss',
    '../../app.component.scss'],
})
export class HuffmanTreeComponent implements OnInit {

  @Input() tree: any;

  constructor() {
  }

  ngOnInit() {
  }

}
