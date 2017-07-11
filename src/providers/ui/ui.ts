import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
@Injectable()
export class UiProvider {

  constructor(public toastCtrl: ToastController) {
    
  }

  onDisplayToast(_message: string = ""){
    let toast = this.toastCtrl.create({
      message: _message,
      duration: 2000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      
    });

    toast.present();
  }

}
