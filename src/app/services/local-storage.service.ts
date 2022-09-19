import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public saveData(key: string, value: string | number | object | null) {
    if (value !== null) {
      switch (typeof value) {
        case 'string':
          localStorage.setItem(key, value);
          break;
        case 'number':
          localStorage.setItem(key, value.toString());
          break;
        default:
          localStorage.setItem(key, JSON.stringify(value));
          break;
      }
    }
  }

  public getData(key: string, formatJson: boolean = false) {
    const valor: string | null = localStorage.getItem(key);
    return valor !== null
      ? formatJson
        ? JSON.parse(valor)
        : localStorage.getItem(key)
      : null;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }

  public removeArrayElement(key: string, value: string) {
    const arr = this.getData(key, true);
    if (Array.isArray(arr)) {
      arr.splice(arr.indexOf(value), 1);
      this.saveData(key, arr);
    }
  }
}
