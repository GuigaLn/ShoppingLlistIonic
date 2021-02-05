import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ListProductService } from 'src/app/services/list-product/list-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;

  constructor(
    private menu: MenuController,
    private alertController: AlertController,
    private loadingController: LoadingController, 
    private toastController: ToastController,
    private listProductService: ListProductService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Excluir!',
      message: 'Deseja Realmente <strong>Excluir</strong> Seu Conta???',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Okay',
          handler: async() => {
            await this.presentLoading();

            try {
              this.finalizarCompras().then(() => {
                this.authService.delete().then(() => {
                  this.presentToast("Deletado Com Sucesso!", "success");
                  this.route.navigate(['/login']);
                }).catch(function(error) {
                  this.presentToast("Erro ao Deletar", "danger");
                });
              }).catch(function(error) {
                this.presentToast("Erro ao Deletar", "danger");
              });
            } catch (error) {
              this.presentToast("Erro ao Deletar", "danger");
            }

            this.loading.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  async finalizarCompras() {
    try{
      await this.listProductService.finalizarCompras(this.authService.getAuth().currentUser.uid);
    } catch (err){  
      this.presentToast("Erro ao Deletar", "danger");
      return Error;
    }
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
