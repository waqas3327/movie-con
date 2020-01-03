import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
name = 'No user';
public appPages = [
    {
      title: 'Login',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Register',
      url: '/register',
      icon: 'create'
    },
    {
      title: 'Movies',
      url: '/movies',
      icon: 'videocam'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    }
  ];
constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
    this.backbutton();
  }
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
  });
  }
initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  // tslint:disable-next-line: use-lifecycle-interface
ngDoCheck() {
    this.name = localStorage.getItem('name');
  }
  // tslint:disable-next-line: use-lifecycle-interface
ngOnDestroy() {
    localStorage.removeItem('name');
  }

}
