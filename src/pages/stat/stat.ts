import { Score } from './../../providers/score';
import { DataProvider } from './../../providers/data/data';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-stat',
  templateUrl: 'stat.html',
})
export class StatPage {

  //scoreTab: Score[] = [];
  scoreTab: any[] = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: DataProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {}
  ngOnInit(){
    this.db.onfetchScore()
    .then((data: Score[]) => {
      //this.scoreTab = data;
      //console.log("SCORE : " + JSON.stringify(data));
      for(let i = 0; i < data.length; i++){
        this.scoreTab.push({show: false, scoreLine: data[i]});
      }
    });
  }

  onDelete() {
    let confirm = this.alertCtrl.create({
      title: '',
      message: "Êtes-vous certain de vouloir supprimer l'historique des scores ?",
      buttons: [
        {
          text: 'ANNULER',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'SUPPRIMER',
          handler: () => {
            this.db.onDeleteScore();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  onShowHideDetail(index: number){
    if(index <= this.scoreTab.length){
      this.scoreTab[index].show = !this.scoreTab[index].show;
    }
  }
}
