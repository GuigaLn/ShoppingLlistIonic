import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiWatherService {
  private infomation: any;

  constructor(private http: HttpClient) {  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  readDate(lat: string, lng: string): any {
    this.infomation = this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2e96eab1e2ee8ac927be543b4a0b0c09`);
    
    return this.infomation;
  }
}
