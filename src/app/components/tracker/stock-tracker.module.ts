import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StockSearchComponent } from './search/stock-search.component';
import { StockTrackerComponent } from './stock-tracker/stock-tracker.component';
import { StockComponent } from './stock/stock.component';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  declarations: [
    StockSearchComponent,
    StocksComponent,
    StockComponent,
    StockTrackerComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [StockSearchComponent, StocksComponent],
})
export class StockTrackerModule {}
