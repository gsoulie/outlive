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
  onOpenMap(){
    this.navCtrl.push(MapPage,{nbSurvivor: this.nbSurvivor,extension: this.extension});
  }
  onOpenScoring(){
    this.navCtrl.push(ScoringPage);
  }
}
