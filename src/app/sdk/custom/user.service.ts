import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectConfig } from '../project.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  public userLogin(credentials: object): Observable<any> {

    const url = ProjectConfig.getPath() + '/login';

    return this.http.post(url, credentials);
  }
  public userRegister(credentials: object): Observable<any> {
    const url = ProjectConfig.getPath() + '/register';

    return this.http.post(url, credentials);
  }
  public userForgotPassword(credentials: object): Observable<any> {
    const url = ProjectConfig.getPath() + '/sendmail';

    return this.http.post(url, credentials);
  }
}
