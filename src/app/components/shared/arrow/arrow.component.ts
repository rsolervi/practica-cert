import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stt-arrow',
  template: `<div [ngClass]="up? 'up' : (up === false ? 'down' : '')">{{up ? '&#129145;' : (up === false ? '&#129147;' : '')}}</div>`,
  styleUrls: ['./arrow.component.scss'],
})
export class ArrowComponent implements OnInit {
  constructor() {}

  @Input() up: boolean | null = null;

  ngOnInit(): void {}
}
