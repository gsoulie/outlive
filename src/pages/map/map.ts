import { Config } from './../../providers/config';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              /*private screenOrientation: ScreenOrientation,*/
              private data: DataProvider) {}

  ngOnInit(){
    this.nbSurvivor = this.navParams.get("nbSurvivor") || "4";
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  ionViewDidLoad() {
    this.onResetTiles();
    console.log('ionViewDidLoad MapPage');
  }
  onResetTiles(){
    this.silentPeakTiles = this.data.onDiscardSilentPeakTiles(this.nbSurvivor, Config.CITY_SILENTPEAK);
    this.blackWoodTiles = this.data.onDiscardSilentPeakTiles(this.nbSurvivor, Config.CITY_BLACKWOOD);
    this.silentPeakDiscardTiles = this.data.getSilentPeakDiscardedTiles();
    this.blackWoodDiscardTiles = this.data.getBlackwoodDiscardedTiles();
    this.initTileBlackwood = true;
    this.initTileSilentPeak = true;
  }

  /**
   * Piocher une tuile dans silent peak
   */
  onGetSilentPeakTile(){
    // Choisir la tuile en faisant un random sur le nombre de tuiles de la pile 
    if(this.silentPeakTiles.length > 0){
      this.initTileSilentPeak = false;
      let tileIndex = Math.floor(Math.random() * this.silentPeakTiles.length) + 1; // chiffre random entre 1 et 10
      tileIndex--;
    
      // ajouter la tuile piochées dans la silentPeakDiscardTile
      this.silentPeakDiscardTiles.push(this.silentPeakTiles[tileIndex]);
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
      let tileIndex = Math.floor(Math.random() * this.blackWoodTiles.length) + 1; // chiffre random entre 1 et 10
      tileIndex--;

      // ajouter la tuile piochées dans la blackWoodDiscardTiles
      this.blackWoodDiscardTiles.push(this.blackWoodTiles[tileIndex]);
      //this.blackWoodDiscardTiles.reverse();
      this.blackWoodTiles.splice(tileIndex,1);
    }
  }

  back(){
    this.navCtrl.pop();
  }
}
