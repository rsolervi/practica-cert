import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Stock } from '../../../models/stock';
import { LocalStorageService } from '../../../services/local-storage.service';
import { StockApiService } from '../../../services/stock-api.service';

@Component({
  selector: 'stt-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit, OnChanges {
  @Input() newSymbols: string[] = [];
  @Output() clickDeletedStock: EventEmitter<string> = new EventEmitter();
  symbols: string[] = [];
  data: Stock[] = [];
  loading: boolean = false;

  constructor(
    public storageService: LocalStorageService,
    public stocksApi: StockApiService
  ) {}

  ngOnInit(): void {
    //
  }

  private getDataSymbols() {
    const obsSimbolos = [];
    for (const symbol of this.newSymbols) {
      obsSimbolos.push(
        this.stocksApi.getCompanyName(symbol).pipe(
          switchMap((empresa: string) => {
            if (empresa !== null) {
              return this.stocksApi.getStock(symbol).pipe(
                map((s) => {
                  s.name = empresa;
                  s.symbol = symbol;
                  return s;
                })
              );
            } else {
              this.storageService.removeArrayElement('symbols', symbol);
              return of(null);
            }
          })
        )
      );
    }
    if (obsSimbolos && obsSimbolos.length > 0) {
      this.loading = true;
      forkJoin(obsSimbolos).subscribe((res) => {
        res.forEach((e) => {
          if (e !== null) {
            this.data.push(e);
          }
        });
        //this.data = this.data.concat(res);
        this.loading = false;
      });
    }
  }

  onClickDeleteCard(symbol: string) {
    this.data = this.data.filter((s) => {
      return s.symbol !== symbol;
    });
    this.storageService.removeArrayElement('symbols', symbol);
    this.clickDeletedStock.emit(symbol);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const valores = changes.newSymbols;
    if (
      valores.previousValue === undefined ||
      (valores.previousValue !== undefined &&
        valores.currentValue &&
        valores.previousValue.indexOf(valores.currentValue[0]) === -1)
    ) {
      this.getDataSymbols();
    }
    // if(changes.newSymbols.currentValue.length > changes.newSymbols.previousValue.length){

    // }
  }
}
