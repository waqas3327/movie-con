import { Component, OnInit } from '@angular/core';
import { BeersService, SearchType } from '../sdk/custom/beers.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  results: Observable<any>;
  // tslint:disable-next-line: no-inferrable-types
  searchTerm: string = '';
  type: SearchType = SearchType.all;
  loading = false;
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  constructor(private http: BeersService, private router: Router) { this.backbutton(); }
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
  });
  }
  ngOnInit() {
  }
  ngViewWillLeave() {
    this.loading = false;
  }
  // tslint:disable-next-line: use-lifecycle-interface
   /* ngOnDestroy() {
    localStorage.removeItem('token');
  } */
  textchanged() {
    this.loading = true;
  }
  logout() {
    this.router.navigate(['home']);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
  }
  searchChanged() {
    // Call our service function which returns an Observable
    this.results = this.http.searchData(this.searchTerm, this.type);
  }
}
