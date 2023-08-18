import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Stock from '../shared/models/stock-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly baseUrl = 'http://localhost:8080/stocks';

  constructor(private http: HttpClient) { }

  getAllStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/stocks`);
  }

  getTodayStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${this.baseUrl}/stocks/today`);
  }
}
