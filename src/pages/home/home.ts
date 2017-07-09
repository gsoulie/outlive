import { HordePage } from './../horde/horde';
import { ScoringPage } from './../scoring/scoring';
import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nbSurvivor: string = "4";
  players: any = {};
  extension: boolean = false;

  constructor(public navCtrl: NavController) {
  }
  onStart(){
    console.log("start " + this.nbSurvivor);
    
    switch(this.nbSurvivor){
      case "1": 
        this.onOpenHorde();
        break
      case "2" :
      case "3" :
      case "4" :
        this.onOpenMap();
        break
      default :
        this.onOpenMap();
        break
    }

  }
  onOpenMap(){
    this.navCtrl.push(MapPage,{nbSurvivor: this.nbSurvivor,extension: this.extension});
  }
  onOpenScoring(){
    this.navCtrl.push(ScoringPage);
  }
  onOpenHorde(){
    this.navCtrl.push(HordePage,{nbSurvivor: this.nbSurvivor,extension: this.extension});
  }
}
