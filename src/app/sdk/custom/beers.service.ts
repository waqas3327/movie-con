import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'q';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export enum SearchType {
  all = '',
  movie = 'movie',
  series = 'series',
  episode = 'episode'
}
@Injectable({
  providedIn: 'root'
})
export class BeersService {
  url = 'http://www.omdbapi.com/';
  apiKey = 'b1cbb0e1';
  constructor(private http: HttpClient) { }
  searchData(title: string, type: SearchType): Observable<any> {
    return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).pipe(
      // tslint:disable-next-line: no-string-literal
      map(results => results['Search'])
    );
  }
  getDetails(id) {
    return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  }
}
