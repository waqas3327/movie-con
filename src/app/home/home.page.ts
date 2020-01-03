import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading: false;
  clicked = false;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChild(IonRouterOutlet, { static: false }) routerOutlets: IonRouterOutlet;

  // tslint:disable-next-line: max-line-length
  constructor(private alertController: AlertController, private router: Router, private formBuilder: FormBuilder, private service: UserService) { this.backbutton()}
  loginForm: FormGroup;
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
      if (this.routerOutlets && this.routerOutlets.canGoBack()) {
        this.routerOutlets.pop();
      } else if (this.router.url === '/home') {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
        } else {
          // tslint:disable-next-line: no-string-literal
          navigator['app'].exitApp();
        }
      }
    });
      }
     async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Are you sure you want to exit the app?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => { }
      }, {
        text: 'Close App',
        handler: () => {
          // tslint:disable-next-line: no-string-literal
          navigator['app'].exitApp();
        }
      }]
    });
    await alert.present();
      }
  register() {
   this.router.navigate(['register']);
  }
  forgotPassword() {
    console.log('working on it!');
    this.router.navigate(['forgotpassword']);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ionViewWillEnter() {
    this.loading = false;
    this.clicked = false;
    this.loginForm.reset();
  }

  login() {
    this.clicked = true;
    try {
    const loginData = this.loginForm.value;
    console.log('loginData', loginData);
    this.service.userLogin(loginData).subscribe(
      data => {
        console.log('got response from server', data);
        localStorage.setItem('token', 'mytoken');
        localStorage.setItem('name', loginData.email);
        this.loading = false;
        this.router.navigate(['movies']);
      },
      error => {
        this.clicked = false;
        this.loading = false;
        console.log('error', error);
        alert('Wrong email or password!');
      }
    );
    } catch (ex) {
        console.log('ex', ex);
      }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.clicked = false;
    this.formInitializer();
  }
  ionViewDidLoad() {
  this.loginForm.reset();
  }

  formInitializer() {
    this.loginForm = this.formBuilder.group({
       email: [null, [Validators.required, Validators.email]],
       password: [null, [Validators.required]]
    });
  }
}

