import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
// tslint:disable-next-line: prefer-const

constructor() { this.backbutton(); }
backbutton() {
  console.log('backbutton');
  document.addEventListener('backbutton', () => {
    console.log('backbutton1');
});
}
ngOnInit() {
  }

}
