import { snapshotToArray } from "./../../app/app.module";
import { AngularFireDatabase } from "angularfire2/database";
import { ClienteProvider } from "./../../providers/cliente/cliente";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as firebase from "firebase";

@IonicPage()
@Component({
  selector: "page-adicionar-cliente",
  templateUrl: "adicionar-cliente.html"
})
export class AdicionarClientePage {
  clientes = [];
  ref = firebase.database().ref("clientes/");
  inputText: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private FormBuilder: FormBuilder,
    private provider: ClienteProvider,
    private toast: ToastController,
    public db: AngularFireDatabase
  ) {
    //this.cliente = this.navParams.data.cliente || {};
    // this.createForm();
    this.ref.on("value", resp => {
      this.clientes = snapshotToArray(resp);
    });
    //this.setupPageTitle();
  }

  //teste insert
  addCliente(cli) {
    if (cli !== undefined && cli !== null) {
      let newCli = this.ref.push();
      newCli.set(cli);
      this.inputText = '';
    }
  }
  ionViewDidLoad() {
    // console.log("ionViewDidLoad AdicionarClientePage");
  }
  newCliente() {
    this.navCtrl.push("AdicionarClientePage");
  }

  // cadastroCliente(){
  //   this.db.database.ref('/CUSTOMERS').push(this.createForm)
  // }
  // private setupPageTitle() {
  //   this.title = this.navParams.data.cliente
  //     ? "Alterando cliente"
  //     : "Novo cliente";
  // }

  // createForm() {
  //   this.form = this.FormBuilder.group({
  //     key: [this.cliente.key],
  //     name: [this.cliente.name, Validators.required],
  //     phone: [this.cliente.phone, Validators.required]
  //   });
  // }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.provider
  //       .save(this.form.value)
  //       .then(() => {
  //         this.cliente.toast
  //           .create({ message: "Cliente salvo com sucesso!", duration: 3000 })
  //           .present();
  //         this.navCtrl.pop();
  //       })
  //       .catch(e => {
  //         this.cliente.toast
  //           .create({ message: "Cliente salvo com sucesso!", duration: 3000 })
  //           .present();
  //         console.error(e);
  //       });
  //   }
  // }
}
