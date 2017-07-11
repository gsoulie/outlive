import { UiProvider } from './../../providers/ui/ui';
import { StatPage } from './../stat/stat';
import { Score } from './../../providers/score';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController  } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-scoring',
  templateUrl: 'scoring.html',
})
export class ScoringPage {
  p1Name: string = "Survivant 1";
  p2Name: string = "Survivant 2";
  p3Name: string = "Survivant 3";
  p4Name: string = "Survivant 4";
  event_p1: any;
  event_p2: any;
  event_p3: any;
  event_p4: any;
  room_p1: any;
  room_p2: any;
  room_p3: any;
  room_p4: any;
  rad_p1: any;
  rad_p2: any;
  rad_p3: any;
  rad_p4: any;
  survivor_p1: any;
  survivor_p2: any;
  survivor_p3: any;
  survivor_p4: any;
  stuff_p1: any;
  stuff_p2: any;
  stuff_p3: any;
  stuff_p4: any;
  t1: number;
  t2: number;
  t3: number;
  t4: number;
  p1Winner: boolean = false;
  p2Winner: boolean = false;
  p3Winner: boolean = false;
  p4Winner: boolean = false;

  scoreTab: Score[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              public db: DataProvider,
              private ui: UiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScoringPage');
  }
 
  onSave(){
    //TODO: Ajouter contrôles de saisie
    if(this.onSaisieOk() == true){
      let entry = new Score(new Date().toString(),{
        name: this.p1Name,
        event: this.event_p1,
        room: this.room_p1,
        rad: this.rad_p1,
        survivor: this.survivor_p1,
        stuff: this.stuff_p1,
        total: this.t1,
        win: this.p1Winner
      },{
        name: this.p2Name,
        event: this.event_p2,
        room: this.room_p2,
        rad: this.rad_p2,
        survivor: this.survivor_p2,
        stuff: this.stuff_p2,
        total: this.t2,
        win: this.p2Winner
      },{
        name: this.p3Name,
        event: this.event_p3,
        room: this.room_p3,
        rad: this.rad_p3,
        survivor: this.survivor_p3,
        stuff: this.stuff_p3,
        total: this.t3,
        win: this.p3Winner
      },{
        name: this.p4Name,
        event: this.event_p4,
        room: this.room_p4,
        rad: this.rad_p4,
        survivor: this.survivor_p4,
        stuff: this.stuff_p4,
        total: this.t4,
        win: this.p4Winner
      });
      this.db.onAddScore(entry);
      this.ui.onDisplayToast("Partie enregistrée");

      //TODO : vider tous les champs
      this.onResetField();
    }
  }

  onSaisieOk(){
    
    if((this.t1 == 0 || this.t1 == null) && (this.t2 == 0 || this.t2 == null) && (this.t3 == 0 || this.t3 == null) && (this.t4 == 0 || this.t4 == null)){
      this.ui.onDisplayToast("Aucun score à enregistrer !");
      return false;
    }
    return true;
  }

  onResetField(){
    this.event_p1 = null;
    this.event_p2 = null;
    this.event_p3 = null;
    this.event_p4 = null;
    this.room_p1 = null;
    this.room_p2 = null;
    this.room_p3 = null;
    this.room_p4 = null;
    this.rad_p1 = null;
    this.rad_p2 = null;
    this.rad_p3 = null;
    this.rad_p4 = null;
    this.survivor_p1 = null;
    this.survivor_p2 = null;
    this.survivor_p3 = null;
    this.survivor_p4 = null;
    this.stuff_p1 = null;
    this.stuff_p2 = null;
    this.stuff_p3 = null;
    this.stuff_p4 = null;
    this.t1 = null;
    this.t2 = null;
    this.t3 = null;
    this.t4 = null;
    this.p1Winner = false;
    this.p2Winner = false;
    this.p3Winner = false;
    this.p4Winner = false;
  }

  onCalculate(form: NgForm){
    let a,b,c,d,e;
    a = this.event_p1 ? parseFloat(this.event_p1) : 0;
    b = this.room_p1 ? parseFloat(this.room_p1) : 0;
    c = this.rad_p1 ? parseFloat(this.rad_p1) : 0;
    d = this.survivor_p1 ? parseFloat(this.survivor_p1) : 0;
    e = this.stuff_p1 ? parseFloat(this.stuff_p1) : 0;

    this.t1 = a+b+c+d+e;

    a = this.event_p2 ? parseFloat(this.event_p2) : 0;
    b = this.room_p2 ? parseFloat(this.room_p2) : 0;
    c = this.rad_p2 ? parseFloat(this.rad_p2) : 0;
    d = this.survivor_p2 ? parseFloat(this.survivor_p2) : 0;
    e = this.stuff_p2 ? parseFloat(this.stuff_p2) : 0;
    
    this.t2 = a+b+c+d+e;

    a = this.event_p3 ? parseFloat(this.event_p3) : 0;
    b = this.room_p3 ? parseFloat(this.room_p3) : 0;
    c = this.rad_p3 ? parseFloat(this.rad_p3) : 0;
    d = this.survivor_p3 ? parseFloat(this.survivor_p3) : 0;
    e = this.stuff_p3 ? parseFloat(this.stuff_p3) : 0;

    this.t3 = a+b+c+d+e;

    a = this.event_p4 ? parseFloat(this.event_p4) : 0;
    b = this.room_p4 ? parseFloat(this.room_p4) : 0;
    c = this.rad_p4 ? parseFloat(this.rad_p4) : 0;
    d = this.survivor_p4 ? parseFloat(this.survivor_p4) : 0;
    e = this.stuff_p4 ? parseFloat(this.stuff_p4) : 0;

    this.t4 = a+b+c+d+e;

    // Récupérer le score max pour déterminer le vainqueur
    let score = [];
    score.push(this.t1);
    score.push(this.t2);
    score.push(this.t3);
    score.push(this.t4);
    
    let max;
    max = Math.max.apply(null,score);
    this.p1Winner = (this.t1 == max);
    this.p2Winner = (this.t2 == max);
    this.p3Winner = (this.t3 == max);
    this.p4Winner = (this.t4 == max);
  }

  onPromptPlayerName(playerIndex: number = 1){
    let prompt = this.alertCtrl.create({
          title: '',
          message: "Entrez le nom du survivant n°"+playerIndex,
          inputs: [
            {
              name: 'Survivant',
              placeholder: 'Nom'
            },
          ],
          buttons: [
            {
              text: 'ANNULER',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'ENREGISTRER',
              handler: data => {
                console.log("name = " + JSON.stringify(data));
                switch(playerIndex){
                  case 1 :
                    this.p1Name = data.Survivant;
                    break;
                  case 2 :
                    this.p2Name = data.Survivant;
                    break;
                  case 3 :
                    this.p3Name = data.Survivant;
                    break;
                  case 4 :
                    this.p4Name = data.Survivant;
                    break;
                }
              }
            }
          ]
        });
    prompt.present();
  }

  onOpenStats(){
    this.navCtrl.push(StatPage);
  }
}
