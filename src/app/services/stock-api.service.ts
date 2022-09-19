import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sentiment } from '../models/sentiment';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root',
})
export class StockApiService {
  urlBase: string = 'https://finnhub.io/api/v1';
  token: string = 'bu4f8kn48v6uehqi3cqg';

  constructor(public http: HttpClient) {}

  public getStock(symbol: string): Observable<Stock> {
    return this.http
      .get(`${this.urlBase}/quote?symbol=${symbol}&token=${this.token}`)
      .pipe(
        map((ob: any) => {
          return {
            currentPrice: ob.c,
            change: ob.d,
            percent: ob.p,
            highPrice: ob.h,
            lowPrice: ob.l,
            openPrice: ob.o,
            previousClosePrice: ob.pc,
          } as Stock;
        })
      );
  }

  public getCompanyName(symbol: string): Observable<string> {
    return this.http
      .get(`${this.urlBase}/search?q=${symbol}&token=${this.token}`)
      .pipe(
        map((ob: any) => {
          if (ob.count > 0) {
            const company = ob.result[0];
            if (company.symbol === symbol) {
              return company.description;
            } else {
              return null;
            }
          } else {
            return null;
          }
        })
      );
  }

  public getSentiment(
    symbol: string,
    from: Date,
    to: Date
  ): Observable<Sentiment[]> {
    const desde = this.formatDate(from);
    const hasta = this.formatDate(to);
    return this.http
      .get<any>(
        `${this.urlBase}/stock/insider-sentiment?symbol=${symbol}&from=${desde}&to=${hasta}&token=${this.token}`
      )
      .pipe(
        map((res) => {
          return res.data.map((d: any) => {
            return {
              symbol: d.symbol,
              year: d.year,
              month: d.month,
              change: d.change,
              mspr: d.mspr,
            } as Sentiment;
          });
        })
      );
  }

  private formatDate(d: Date) {
    return (
      d.getFullYear() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + d.getDate()).slice(-2) +
      ''
    );
  }
}
