import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Sentiment } from '../../models/sentiment';
import { StockApiService } from '../../services/stock-api.service';

@Component({
  selector: 'stt-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.scss'],
})
export class StockDetailComponent implements OnInit {
  symbol: string = '';
  empresa: string = '';
  loading: boolean = false;
  data?: Sentiment[];

  constructor(
    private route: ActivatedRoute,
    public stocksApi: StockApiService,
    private location: Location
  ) {
    const psymbol = this.route.snapshot.paramMap.get('symbol');
    if (psymbol) {
      this.symbol = psymbol;
    }
  }

  ngOnInit(): void {
    const today = new Date();
    const from = new Date(today.setMonth(today.getMonth() - 2));
    this.loading = true;
    const ob$ = this.stocksApi.getCompanyName(this.symbol).pipe(
      switchMap((empresa: string) => {
        if (empresa !== null) {
          this.empresa = empresa;
          return this.stocksApi.getSentiment(this.symbol, from, new Date());
        } else {
          return of(null);
        }
      })
    );
    ob$.subscribe((res: Sentiment[] | null) => {
      if (res) {
        this.data = res;
        this.data = this.completarDatos(this.data);
      }
      this.loading = false;
    });
  }
  completarDatos(data: Sentiment[]) {
    const dates = [
      new Date(),
      new Date(new Date().setMonth(new Date().getMonth() - 1)),
      new Date(new Date().setMonth(new Date().getMonth() - 2)),
    ];
    let months: { month: number; year: number }[] = [];
    dates.forEach((d) => {
      if (data.filter((s) => s.month === d.getMonth() + 1).length === 0) {
        months.push({
          month: d.getMonth() + 1,
          year: d.getFullYear(),
        });
      }
    });
    if (data.length < 3) {
      for (let i = 0; i < months.length; i++) {
        data.push({
          symbol: this.symbol,
          year: months[i].year,
          month: months[i].month,
          change: null,
          mspr: null,
        } as Sentiment);
      }
    }
    data.sort((a, b) => {
      a.year <= b.year;
      if (a.year == b.year) {
        if (a.month <= b.month) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a.year < b.year) {
        return -1;
      }
      return 1;
    });
    return data;
  }

  back() {
    this.location.back();
  }
}
