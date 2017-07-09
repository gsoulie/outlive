import { HordePage } from './../pages/horde/horde';
import { ScoringPage } from './../pages/scoring/scoring';
import { Config } from './../providers/config';
import { Http } from '@angular/http';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { MapPage } from './../pages/map/map';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataProvider } from '../providers/data/data';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    ScoringPage,
    HordePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    ScoringPage,
    HordePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Http,
    Config
  ]
})
export class AppModule {}
