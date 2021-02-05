import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public user: User = {};
  private loading: any;

  constructor(
    private loadingController: LoadingController, 
    private toastController: ToastController,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  loginLink() {
    this.route.navigate(['/login']);
  }

  async register() {
    await this.presentLoading();
    
    try {
      await this.authService.register(this.user);

      this.presentToast("Cadastrado Com Sucesso!", "success");
      this.route.navigate(['/login']);
    } catch (err){

      let message = '';
      switch(err.code) {
        case 'auth/weak-password':
          message = 'Senha Muito Curta!';
          break;
          
        case 'auth/email-already-in-use':
          message = 'E-mail Ja Cadastrado!';
          break;
        
        case 'auth/invalid-email':
          message = 'E-mail Invalido!';
          break;
        
        default:
          message = 'Erro! Tente Novamente';
          break;
      }

      this.presentToast(message, "danger");
    } finally {
      this.loading.dismiss();
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
