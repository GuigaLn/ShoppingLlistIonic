import { Component, OnInit } from '@angular/core';
import { ApiCurrencyService } from 'src/app/services/currency/api-currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.page.html',
  styleUrls: ['./currency.page.scss'],
})

export class CurrencyPage implements OnInit {
  public currencys: any;

  constructor(private apiService: ApiCurrencyService) { 
    this.readDate();
  }

  ngOnInit() {
  }

  readDate() {
    this.apiService.readDate().subscribe((data) => {
      this.currencys = data;

      console.log(this.currencys);
    });
  }
  
}