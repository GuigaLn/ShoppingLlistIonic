import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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

  registerLink() {
    this.route.navigate(['/register']);
  }

  async login() {
    await this.presentLoading();
    
    try {
      await this.authService.login(this.user);

      this.presentToast("Login Realizado Com Sucesso!", "success");
    } catch (err){  
      this.presentToast("Erro ao Realizar o Login", "danger");
    } finally {
      this.loading.dismiss();
    }
  }

  async facebookLogin() {
    try {
      await this.authService.loginFacebook();

      console.log(this.authService.getAuth().currentUser.email);

    } catch (err) {
      console.log(err);
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
