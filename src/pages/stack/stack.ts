import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-stack',
  templateUrl: 'stack.html',
})
export class StackPage implements OnInit{
  stack: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.stack = this.navParams.get("stack") || [];

  }
  ionViewDidLoad() {}

}