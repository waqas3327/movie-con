import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      alert('Please Login to continue!');
    }
  }
}
