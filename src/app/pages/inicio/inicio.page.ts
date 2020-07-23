import { Component, OnInit, ViewChild } from '@angular/core';
import { DadosPage } from 'src/app/modal/dados/dados.page';
import { NavController, ModalController, AlertController, IonInfiniteScroll } from '@ionic/angular';
import { DatabaseService } from 'src/app/core/service/database.service';
import { InformacaoPage } from 'src/app/modal/informacao/informacao.page';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  dados:any[] = [];

  constructor(public navCtrl: NavController,public modalController: ModalController, public dadoService:DatabaseService, public alertController: AlertController) {
    this.getAllRegistros();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      if (this.dados.length == 3) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  public ngOnInit(){

  }

  async abrirInfo(){
    console.log("teste")
    const modal = await this.modalController.create({
      component: InformacaoPage,
      cssClass: 'my-custom-class'
    });

    return await modal.present();
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
