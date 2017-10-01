import { MapPopoverPage } from './../map-popover/map-popover';
import { StackPage } from './../stack/stack';
import { Config } from './../../providers/config';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit{

  silentPeakTiles: any[] = [];
  blackWoodTiles: any[] = [];
  silentPeakDiscardTiles: any[] = [];
  blackWoodDiscardTiles: any[] = [];
  nbSurvivor = "4";
  initTileBlackwood: boolean = true;  // indique si c'est le premier chargement (on n'affiche pas le liseret jaune)
  initTileSilentPeak: boolean = true;
  extension: boolean = false;
  currentBlackwoodTile: any = {};
  currentSilentpeakTile: any = {};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data: DataProvider,
              private popoverCtrl: PopoverController) {}

  ngOnInit(){
    this.nbSurvivor = this.navParams.get("nbSurvivor") || "4";
    this.extension = this.navParams.get("extension") || false;
  }
  ionViewDidLoad() {
    this.onResetTiles();
    console.log('ionViewDidLoad MapPage');
  }
  onResetTiles(){
    this.silentPeakTiles = this.data.onDiscardCityTiles(this.nbSurvivor, Config.CITY_SILENTPEAK,this.extension);
    this.blackWoodTiles = this.data.onDiscardCityTiles(this.nbSurvivor, Config.CITY_BLACKWOOD,this.extension);
    this.silentPeakDiscardTiles = this.data.getSilentPeakDiscardedTiles();
    this.blackWoodDiscardTiles = this.data.getBlackwoodDiscardedTiles();
    this.initTileBlackwood = true;
    this.initTileSilentPeak = true;
    this.currentBlackwoodTile = {};
    this.currentSilentpeakTile = {};
  }

  /**
   * Piocher une tuile dans silent peak
   */
  onGetSilentPeakTile(){
    // Choisir la tuile en faisant un random sur le nombre de tuiles de la pile 
    if(this.silentPeakTiles.length > 0){
      this.initTileSilentPeak = false;
      /*let tileIndex = Math.floor(Math.random() * this.silentPeakTiles.length) + 1; // chiffre random entre 1 et 10
      tileIndex--;*/
      let tileIndex = 0;
    
      // ajouter la tuile piochées dans la silentPeakDiscardTile
      this.silentPeakDiscardTiles.push(this.silentPeakTiles[tileIndex]);
      this.currentSilentpeakTile = this.silentPeakTiles[tileIndex];
      this.silentPeakTiles.splice(tileIndex,1);
    }
  }

  /**
   * piocher une tuile à blackwood
   */
  onGetBlackwoodTile(){
    // Choisir la tuile en faisant un random sur le nombre de tuiles de la pile 
    if(this.blackWoodTiles.length > 0){
      this.initTileBlackwood = false;
      /*let tileIndex = Math.floor(Math.random() * this.blackWoodTiles.length) + 1; // chiffre random entre 1 et 10
      tileIndex--;*/
      let tileIndex = 0;

      // ajouter la tuile piochées dans la blackWoodDiscardTiles
      this.blackWoodDiscardTiles.push(this.blackWoodTiles[tileIndex]);      //this.blackWoodDiscardTiles.reverse();
      this.currentBlackwoodTile = this.blackWoodTiles[tileIndex];
      this.blackWoodTiles.splice(tileIndex,1);
    }
  }

  onViewStack(){
    this.navCtrl.push(StackPage,{stack: this.blackWoodTiles});
  }

  presentPopover(ev) {

    /*let popover = this.popoverCtrl.create(PopoverPage, {
      contentEle: this.content.nativeElement,
      textEle: this.text.nativeElement
    });*/
    let popover = this.popoverCtrl.create(MapPopoverPage);

    popover.present({
      ev: ev
    });
  }
}