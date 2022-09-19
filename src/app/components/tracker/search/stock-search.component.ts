import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'stt-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss'],
})
export class StockSearchComponent implements OnInit {
  searchText: string = '';
  @Output() savedSymbol: EventEmitter<string> = new EventEmitter();

  constructor(public storageService: LocalStorageService) {}

  ngOnInit(): void {}

  validar(text: NgModel): boolean | null {
    return text.invalid && (text.dirty || text.touched);
  }

  buscar() {
    if (this.searchText) {
      this.guardarSymbol();
    }
  }

  private guardarSymbol() {
    this.searchText = this.searchText.toUpperCase();
    let simbolos = this.storageService.getData('symbols', true);
    if (!Array.isArray(simbolos)) {
      simbolos = [];
    }
    if (simbolos.indexOf(this.searchText) === -1) {
      simbolos.push(this.searchText);
      this.storageService.saveData('symbols', simbolos);
      this.savedSymbol.emit(this.searchText);
    }
  }
}
