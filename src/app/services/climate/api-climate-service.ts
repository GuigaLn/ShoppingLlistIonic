import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Climate } from '../../interfaces/climate';

@Injectable({
  providedIn: 'root'
})
export class ApiClimateService {
  private infomation: any;

  private api: string = 'https://cep.awesomeapi.com.br/json/';

  constructor(private http: HttpClient) {  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  readDate(cep: string): Observable<any> {
    this.infomation = this.http.get(`https://cep.awesomeapi.com.br/json/${cep}`);
    
    return this.infomation;
  }
}
