import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private alertController: AlertController, private router: Router) { }

  canActivate() {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      this.presentAlertConfirm();
    }
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Error!',
      message: 'Please Login to continue!',
      buttons: [{
        text: 'Okay',
        role: 'exit',
        cssClass: 'secondary',
        handler: (blah) => { }
      },{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }
    ]
    });
    await alert.present();
      }
}
