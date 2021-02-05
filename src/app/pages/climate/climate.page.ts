import { Component, OnInit } from '@angular/core';
import { ApiClimateService } from 'src/app/services/climate/api-climate-service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiWatherService } from 'src/app/services/wahter/api-wather.service';

@Component({
  selector: 'app-climate',
  templateUrl: './climate.page.html',
  styleUrls: ['./climate.page.scss'],
})
export class ClimatePage implements OnInit {
  public cep: string;
  public lng: string;
  public lat: string;
  public address: string;
  public city: string;

  public iconWather: string;
  public statusWather: string;

  public loading: any;


  constructor(
    private apiService: ApiClimateService, 
    private apiWatherService: ApiWatherService,
    private loadingController: LoadingController, 
    private toastController: ToastController,
  ) {
   
   }

  ngOnInit() {
  }

  async readDate() {
    await this.presentLoading();

    try {
      this.apiService.readDate(this.cep).subscribe(async (data) => {

      this.lat = data['lat'];
      this.lng = data['lng'];
      this.city = data['city'];
      this.address = data['address'];
    

      await this.readWather();
      
      this.loading.dismiss();
      this.presentToast("Pesquisa Realizada Com Sucesso!", "success");
    }, (err: Error) => {
      this.loading.dismiss();
      this.presentToast("Erro, Verifique o CEP", "danger");
    })
    } catch ( err ) {
      console.log(err);
    }
    
  };
  
  async readWather() {
    await this.apiWatherService.readDate(this.lat, this.lng).subscribe((data) => {
      console.log(data['weather'][0].id);

      if (data['weather'][0].id >= 200 && data['weather'][0].id <= 232) {
        this.statusWather = "Trovoada";
      } else if (data['weather'][0].id >= 300 && data['weather'][0].id <= 321) {
        this.statusWather = "Chuvisco";
      } else if (data['weather'][0].id >= 500 && data['weather'][0].id <= 531) {
        this.statusWather = "Raio";
      } else if (data['weather'][0].id >= 600 && data['weather'][0].id <= 622) {
        this.statusWather = "Nevando";
      } else if (data['weather'][0].id >= 701 && data['weather'][0].id <= 781) {
        this.statusWather = "Atmosfera";
      } else if (data['weather'][0].id == 800) {
        this.statusWather = "Atmosfera";
      } else {
        this.statusWather = "Com Nuvens";
      }
      

      this.iconWather = `http://openweathermap.org/img/wn/${data['weather'][0].icon}@2x.png`
    })
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Aguarde Um Momento',
    });
    return this.loading.present();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    
    toast.present();
  }
}
