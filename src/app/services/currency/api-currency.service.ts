import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/interfaces/currency';

@Injectable({
  providedIn: 'root'
})
export class ApiCurrencyService {
  private api: string = 'https://economia.awesomeapi.com.br/json/all';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  readDate(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.api)
  }
  
}
