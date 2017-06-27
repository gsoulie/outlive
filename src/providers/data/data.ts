import { Config } from './../config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {

  silentPeak: any[] = [
    {id:1,tile: "Munition",image: "", extension: false},{id:2,tile: "Placard vide",image: "", extension: false},{id:3,tile: "Algue",image: "", extension: false},
    {id:4,tile: "Eau",image: "", extension: false},{id:5,tile: "Bois",image: "", extension: false},{id:6,tile: "Munition",image: "", extension: false},
    {id:7,tile: "Placard vide",image: "", extension: false},{id:8,tile: "Métal",image: "", extension: false},{id:9,tile: "Conserve",image: "", extension: false},
    {id:10,tile: "Puce électronique",image: "", extension: false}
  ];

  blackWood: any[] = [
    {id:1,tile: "Munition",image: "", extension: false},{id:2,tile: "Placard vide",image: "", extension: false},{id:3,tile: "Algue",image: "", extension: false},
    {id:4,tile: "Eau",image: "", extension: false},{id:5,tile: "Bois",image: "", extension: false},{id:6,tile: "Munition",image: "", extension: false},
    {id:7,tile: "Placard vide",image: "", extension: false},{id:8,tile: "Métal",image: "", extension: false},{id:9,tile: "Conserve",image: "", extension: false},
    {id:10,tile: "Puce électronique",image: "", extension: false}
  ];
  silentPeakDiscardTiles: any[] = [];
  blackwoodDiscardTiles: any[] = [];

  constructor() {}

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
  onDiscardSilentPeakTiles(nbPlayer = "4", city: number){
    let tileStack: any[] = [];
    
    if(city == Config.CITY_SILENTPEAK){
      for(var j = 0; j < this.silentPeak.length; j++){
        this.silentPeakDiscardTiles = [];
        tileStack.push(this.silentPeak[j]);
      }
    } else {
      for(var j = 0; j < this.blackWood.length; j++){
        this.blackwoodDiscardTiles = [];
        tileStack.push(this.blackWood[j]);
      }
    }    
    
    var removedTiles = this.onDiscardRandomTile(nbPlayer);
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
    return tileStack;
  }

  /**
   * Supprimer un nombre de tuiles définis selon le nombre de joueurs
   * @param nbPlayer 
   */
  onDiscardRandomTile(nbPlayer = "4"){
    let removedTiles = [];

    switch(nbPlayer){
      case "1":
        // on retire 6 tuiles
        removedTiles = this.fillRemovedTileArray(6);
        break;
      case "2":
        // on retire 4 tuiles
        removedTiles = this.fillRemovedTileArray(4);
        break;
      case "3":
        // on retire 2 tuiles
        removedTiles = this.fillRemovedTileArray(2);
        break;
    }

    return removedTiles;
  }

  /**
   * Retourne un tableau contenant les index des tuiles à supprimer 
   * @param nbTileToDiscard : nombre de tuiles à supprimer selon le nombre de joueurs
   */
  fillRemovedTileArray(nbTileToDiscard: number = 0){
    let removedTiles = [];

    while(removedTiles.length < nbTileToDiscard){
      let tileIndex = Math.floor(Math.random() * 10) + 1; // chiffre random entre 1 et 10
      if(removedTiles.indexOf(tileIndex) < 0){
        removedTiles.push(tileIndex);
      }
    }
    return removedTiles;
  }

}
