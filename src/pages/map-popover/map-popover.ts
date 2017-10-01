import { StackPage } from './../stack/stack';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-map-popover',
  templateUrl: 'map-popover.html',
})
export class MapPopoverPage implements OnInit{
  stack: any[] = [];  // pile de tuile déjà prises

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.stack = this.navParams.get("stack") || [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPopoverPage');
  }

  onOpenBlackwood(){
    this.navCtrl.push(StackPage);
  }
  onOpenSilentpeak(){

  }
}
