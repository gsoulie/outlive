import { MapPage } from './../map/map';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nbSurvivor: string = "4";

  constructor(public navCtrl: NavController) {

  }
  onOpenMap(){
    this.navCtrl.push(MapPage,{nbSurvivor: this.nbSurvivor});
  }
}
