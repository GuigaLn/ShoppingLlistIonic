import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ListProduct } from 'src/app/interfaces/list-product';
import { AuthService } from 'src/app/services/auth.service';
import { ListProductService } from 'src/app/services/list-product/list-product.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  public product: ListProduct = {}
  public listProduct: any;
  public loading: any;
  public title: string;

  constructor(
    private loadingController: LoadingController, 
    private listProductService: ListProductService,
    private toastController: ToastController,
    private authService: AuthService,
    private route: Router
  ) { this.readDate(); }

  ngOnInit() {
  }

  async concluir(id: string) {
    await this.presentLoading();

    try {
      await this.listProductService.concluir(id);

      this.presentToast("Confirmado Com Sucesso!", "success");

      this.readDate();
    } catch (err) {
      this.presentToast("Erro ao Confirmar", "danger");
    } finally {
      this.loading.dismiss();
    }
  }

  async excluir(id: string) {
    await this.presentLoading();

    try {
      await this.listProductService.excluir(id);

      this.presentToast("Excluido Com Sucesso!", "success");

      this.readDate();
    } catch (err) {
      this.presentToast("Erro ao Excluir", "danger");
    } finally {
      this.loading.dismiss();
    }
  }

  readDate() {
    this.listProductService.getItens(this.authService.getAuth().currentUser.uid).then(obj => {
      if(obj[0]) {
        this.listProduct = obj;
      }
      
    });
  }

  async addItem() {
    await this.presentLoading();

    if (this.title == ''){
      console.log('erro');
    } else {
      try {
        this.product.titile = this.title;
        this.product.userId = this.authService.getAuth().currentUser.uid;
        this.product.status = 'ativado';

        await this.listProductService.create(this.product);

        this.presentToast("Cadastro Realizado Com Sucesso!", "success");

        this.readDate();
      } catch (err){  
        this.presentToast("Erro ao Realizar o Cadastro", "danger");
      } finally {
        this.loading.dismiss();
      }
    }
  }

  async finalizarCompras() {
    await this.presentLoading();

    try{
      await this.listProductService.finalizarCompras(this.authService.getAuth().currentUser.uid);

      await this.presentToast("Deletado Com Sucesso!", "success");

    } catch (err){  
      this.presentToast("Erro ao Deletar", "danger");
    } finally {
      this.loading.dismiss();
      this.route.navigate(['/home']);
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
