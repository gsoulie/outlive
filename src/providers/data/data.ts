import { Score } from './../score';
import { Config } from './../config';
import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {

  silentPeak: any[] = [
    {id:1,tile: "Munition",image: "assets/img/tile_munition.png", extension: false},{id:2,tile: "Placard vide",image: "assets/img/tile_placard.png", extension: false},
    {id:3,tile: "Algue",image: "assets/img/tile_algue.png", extension: false},{id:4,tile: "Eau",image: "assets/img/tile_eau.png", extension: false},
    {id:5,tile: "Bois",image: "assets/img/tile_bois.png", extension: false},{id:6,tile: "Munition",image: "assets/img/tile_munition.png", extension: false},
    {id:7,tile: "Placard vide",image: "assets/img/tile_placard.png", extension: false},{id:8,tile: "Métal",image: "assets/img/tile_metal.png", extension: false},
    {id:9,tile: "Conserve",image: "assets/img/tile_conserve.png", extension: false},{id:10,tile: "Puce électronique",image: "assets/img/tile_puce.png", extension: false}
  ];

  blackWood: any[] = [
    {id:1,tile: "Munition",image: "assets/img/tile_munition.png", extension: false},{id:2,tile: "Placard vide",image: "assets/img/tile_placard.png", extension: false},
    {id:3,tile: "Algue",image: "assets/img/tile_algue.png", extension: false},{id:4,tile: "Eau",image: "assets/img/tile_eau.png", extension: false},
    {id:5,tile: "Bois",image: "assets/img/tile_bois.png", extension: false},{id:6,tile: "Munition",image: "assets/img/tile_munition.png", extension: false},
    {id:7,tile: "Placard vide",image: "assets/img/tile_placard.png", extension: false},{id:8,tile: "Métal",image: "assets/img/tile_metal.png", extension: false},
    {id:9,tile: "Conserve",image: "assets/img/tile_conserve.png", extension: false},{id:10,tile: "Puce électronique",image: "assets/img/tile_puce.png", extension: false}
  ];
  silentPeakDiscardTiles: any[] = [];
  blackwoodDiscardTiles: any[] = [];

  refugieTile = {id:11,tile: "Réfugié",image: "assets/img/tile_refugie.png", extension: true};
  pillardTile = {id:11,tile: "Pillard",image: "assets/img/tile_pillard.png", extension: true};
  marchandTile = {id:11,tile: "Marchand",image: "assets/img/tile_marchand.png", extension: true};

  hordeCards: any[] = [
    {id:1, image: "assets/img/horde-1.png"},{id:2, image: "assets/img/horde-2.png"},
    {id:3, image: "assets/img/horde-3.png"},{id:4, image: "assets/img/horde-4.png"},
    {id:5, image: "assets/img/horde-5.png"},{id:6, image: "assets/img/horde-6.png"},
    {id:7, image: "assets/img/horde-7.png"},{id:8, image: "assets/img/horde-8.png"},
  ];

  player1Name: string = "";
  player2Name: string = "";
  player3Name: string = "";
  player4Name: string = "";

  private scoreHistory: Score[] = [];

  constructor(private storage: Storage) {}

  arraySearch(_searchID, _myArray, _rubID){
    if(!_rubID) {_rubID = "id"; } //default search on "id" member
    for (var i=0; i < _myArray.length; i++) {
        if (eval("_myArray[i]." + _rubID) === _searchID) {
            return i;
        }
    };
    return -1;
  };

  getSilentPeakDiscardedTiles(){return this.silentPeakDiscardTiles;}
  getBlackwoodDiscardedTiles(){return this.blackwoodDiscardTiles;}

  /**
   * Supprimer de chaque ville
   * @param nbPlayer 
   */
  onDiscardCityTiles(nbPlayer = "4", city: number, extension: boolean = false){
    let tileStack: any[] = [];
    
    // Créer une pile temporaire contenant toutes les tuiles
    if(city == Config.CITY_SILENTPEAK){
      this.silentPeakDiscardTiles = [];
      for(var j = 0; j < this.silentPeak.length; j++){
        tileStack.push(this.silentPeak[j]);
      }
    } else {
      this.blackwoodDiscardTiles = [];
      for(var k = 0; k < this.blackWood.length; k++){
        tileStack.push(this.blackWood[k]);
      }
    }    

    // Extension activée ?
    if(extension == true){
      // Oui, on rajoute la tuile extension dans la liste initiale
      tileStack.push(this.onGetRandomExtensionTile());
    }  
    
    var removedTiles = this.onDiscardRandomTile(nbPlayer, extension);
    console.log("onDiscardSilentPeakTiles removed " + JSON.stringify(removedTiles));

    for(let i = 0; i < removedTiles.length; i++){
      let idx = this.arraySearch(removedTiles[i],tileStack,"id"); // trouver l'index à supprimer dans la liste des tuiles
      if(idx >= 0){
        if(city == Config.CITY_SILENTPEAK){
          this.silentPeakDiscardTiles.push(tileStack[idx]);
        } else {
          this.blackwoodDiscardTiles.push(tileStack[idx]);
        }
        
        tileStack.splice(idx,1);
      }
    }
    this.shuffle(tileStack);
    return tileStack;
  }

  /**
   * Supprimer un nombre de tuiles définis selon le nombre de joueurs
   * @param nbPlayer 
   * @param extension : indique si on inclut les tuiles extension
   */
  onDiscardRandomTile(nbPlayer = "4", extension: boolean = false){
    let removedTiles = [];

    switch(nbPlayer){
      case "1":
        // on retire 4 tuiles
        removedTiles = this.fillRemovedTileArray(4,extension);
        break;
      case "2":
        // on retire 4 tuiles
        removedTiles = this.fillRemovedTileArray(4,extension);
        break;
      case "3":
        // on retire 2 tuiles
        removedTiles = this.fillRemovedTileArray(2,extension);
        break;
    }

    return removedTiles;
  }

  /**
   * Retourne un tableau contenant les index des tuiles à supprimer 
   * @param nbTileToDiscard : nombre de tuiles à supprimer selon le nombre de joueurs
   * @param extension : indique si on inclut les tuiles extension
   */
  fillRemovedTileArray(nbTileToDiscard: number = 0,extension: boolean = false){
    let removedTiles = [], nbTuile = extension == true ? 11 : 10;

    while(removedTiles.length < nbTileToDiscard){
      let tileIndex = Math.floor(Math.random() * nbTuile) + 1; // chiffre random entre 1 et 10 (ou 11 si extension)
      if(removedTiles.indexOf(tileIndex) < 0){
        removedTiles.push(tileIndex);
      }
    }
    return removedTiles;
  }

  /**
  * Piocher une tuile extension au hasard parmis les 3 proposées
  * @return : tuile
  */
  onGetRandomExtensionTile(){
    // Piocher une tuile au hasard parmis les 3 tuiles extensions
    let randomIndex = Math.floor(Math.random() * 3) + 1;
    switch(randomIndex){
        case 1:
            return this.refugieTile;
        case 2:
            return this.pillardTile;
        case 3:
            return this.marchandTile;
        default:
            return {};
    }
  }

  getHordeCards(){
    return this.hordeCards.slice();
  }

  /**
   * Enregistrer un score en base
   * @param newEntry
   */
  onAddScore(newEntry: Score){
    this.scoreHistory.push(newEntry);
    this.storage.set('score', this.scoreHistory)
    .then()
    .catch(err => {
      this.scoreHistory.splice(this.scoreHistory.indexOf(newEntry, 1))
    });
  }

  /**
   * Récupération de l'historique des scores
   */
  onfetchScore(){
    return this.storage.get('score')
    .then(
      (s: Score[]) => {
        this.scoreHistory = s !== null ? s : [];
        return this.scoreHistory;
      }
    )
    .catch(err => console.log(err))
  }

  /**
   * Suppression de la base des scores
   */
  onDeleteScore(){
    this.scoreHistory = [];
    this.storage.set("score", this.scoreHistory)
    .then(
      () => {
        // doing some stuff
      }
    )
    .catch(
      err => console.log(err)
    );
  }

  /**
   * Shuffles array in place.
   * @param {Array} a items The array containing the items.
   */
  shuffle(a) {
      var j, x, i;
      for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
      }
  }
}