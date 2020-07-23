import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { DadosPage } from '../modal/dados/dados.page';
import { DatabaseService } from '../core/service/database.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  {

  dados:any[] = [];

  constructor(public navCtrl: NavController,public modalController: ModalController, public dadoService:DatabaseService, public alertController: AlertController) {
    this.getAllRegistros();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: DadosPage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss()
    .then((data) => {
      this.getAllRegistros();
  });

    return await modal.present();
  }

  excluir(item){
    this.presentAlertConfirm(item);
    
  }

  getAllRegistros(){
    this.dadoService.getAll().then(dados => {
      this.dados = dados;
    });
  }

  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      message: 'Deseja excluir o registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim, excluir.',
          handler: () => {
            this.dadoService.remove(item.key);
            this.getAllRegistros();
          }
        }
      ]
    });

    await alert.present();
  }




}
