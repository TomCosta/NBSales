import { Observable } from 'rxjs/Observable';
import { ClienteProvider } from './../../providers/cliente/cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-consultar-cliente',
  templateUrl: 'consultar-cliente.html',
})
export class ConsultarClientePage {
  cliente: Observable<any>;

  constructor(public navCtrl: NavController, private provider: ClienteProvider,
    private toast: ToastController) {

    this.cliente = this.provider.getAll();
  }

  clientes: [
    {
      nome: "AÇONOBRE COM. VAREJ. FERRAG. LTDA",
      codigoCliente: "10120378",
      end_rua: "R DAS PEDRAS",
      end_numero: "23",
      end_bairro: "",
      end_cidade: "IPATINGA"
      end_complemento: "",
      end_uf: "SP",
    }
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultarClientePage');
  }

}
