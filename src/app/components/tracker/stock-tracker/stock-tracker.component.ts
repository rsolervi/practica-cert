import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-stock-tracker',
  templateUrl: './stock-tracker.component.html',
  styleUrls: ['./stock-tracker.component.scss'],
})
export class StockTrackerComponent implements OnInit {
  symbols: string[] = [];

  constructor(public storageService: LocalStorageService) {
    this.symbols = this.storageService.getData('symbols', true) ?? [];
  }

  ngOnInit(): void {}

  onSavedSymbol(symbol: string) {
    if (this.symbols.indexOf(symbol) === -1) {
      this.symbols = [symbol];
    }
  }

  onDeletedStock(symbol: string) {
    this.symbols = this.symbols.filter((s) => s !== symbol);
  }
}
