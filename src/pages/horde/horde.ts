import { Config } from './../../providers/config';
import { DataProvider } from './../../providers/data/data';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-horde',
  templateUrl: 'horde.html',
})
export class HordePage implements OnInit{
  hordeCards: any[] = [];
  hordeDiscardCards: any[] = [];
  currentCard: any = {};






  //----
  silentPeakTiles: any[] = [];
  blackWoodTiles: any[] = [];
  silentPeakDiscardTiles: any[] = [];
  blackWoodDiscardTiles: any[] = [];
  nbSurvivor = "4";
  initTileBlackwood: boolean = true;  // indique si c'est le premier chargement (on n'affiche pas le liseret jaune)
  initTileSilentPeak: boolean = true;
  extension: boolean = false;
  //---
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private data: DataProvider) {}

  ngOnInit(){
    this.nbSurvivor = this.navParams.get("nbSurvivor") || "4";
    this.extension = this.navParams.get("extension") || false;
  }
  
  //---
  onResetTiles(){
    this.silentPeakTiles = this.data.onDiscardCityTiles(this.nbSurvivor, Config.CITY_SILENTPEAK,this.extension);
    this.blackWoodTiles = this.data.onDiscardCityTiles(this.nbSurvivor, Config.CITY_BLACKWOOD,this.extension);
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
  //----
  ionViewDidLoad() {
    this.onResetHorde();
    this.onResetTiles();
  }
  onResetHorde(){
    this.hordeCards = this.data.getHordeCards();
    console.log("hordeCards : " + JSON.stringify(this.hordeCards));
    this.hordeDiscardCards = [];
    this.currentCard = {};
    this.onGetHordeCard();
  }

  /**
   * Piocher une carte horde
   */
  onGetHordeCard(){
    // Choisir la carte en faisant un random sur le nombre de cartes de la pile 
    if(this.hordeCards.length > 0){
      let cardIndex = Math.floor(Math.random() * this.hordeCards.length) + 1; // chiffre random entre 1 et 10
      cardIndex--;
    
      // ajouter la carte piochée dans la hordeDiscardCards
      this.hordeDiscardCards.push(this.hordeCards[cardIndex]);
      this.currentCard = this.hordeCards[cardIndex];
      this.hordeCards.splice(cardIndex,1);
    }
  }

  back(){
    this.navCtrl.pop();
  }
}
