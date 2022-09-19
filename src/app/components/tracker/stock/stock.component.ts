import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Stock } from '../../../models/stock';

@Component({
  selector: 'stt-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit, OnChanges, OnDestroy {
  @Input() data?: Stock;
  @Output() clickDeleteCard: EventEmitter<string> = new EventEmitter();

  sube: boolean | null = null;

  constructor(public storageService: LocalStorageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.data &&
      this.data.change !== undefined &&
      this.data.change !== null
    ) {
      this.sube = this.data.change > 0;
    }
  }

  ngOnInit(): void {}

  close(): void {
    console.log('close');
    if (this.data?.symbol) {
      this.clickDeleteCard.emit(this.data?.symbol);
    }
  }

  ngOnDestroy(): void {
    console.log('stock destruido');
  }
}
