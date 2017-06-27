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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private data: DataProvider) {}

  ngOnInit(){
    this.nbSurvivor = this.navParams.get("nbSurvivor") || "4";
    //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }
  onResetTiles(){
    this.silentPeakTiles = this.data.onDiscardSilentPeakTiles(this.nbSurvivor, Config.CITY_SILENTPEAK);
    this.blackWoodTiles = this.data.onDiscardSilentPeakTiles(this.nbSurvivor, Config.CITY_BLACKWOOD);
    this.silentPeakDiscardTiles = this.data.getSilentPeakDiscardedTiles();
    this.blackWoodDiscardTiles = this.data.getBlackwoodDiscardedTiles();

    //TODO
    /*
    - ne pas afficher les piles, juste les tuiles écartées
    - */
  }

  /**
   * Piocher une tuile dans silent peak
   */
  onGetSilentPeakTile(){
    // Choisir la tuile en faisant un random sur le nombre de tuiles de la pile 

    // ajouter la tuile piochées dans la silentPeakDiscardTile
  }

  /**
   * piocher une tuile à blackwood
   */
  onGetBlackwoodTile(){

  }
}
