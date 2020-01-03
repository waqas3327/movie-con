import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  loading = false;
  public clicked = false;
  getData: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private uuserService: UserService) { this.backbutton(); }
  backbutton() {
    console.log('backbutton');
    document.addEventListener('backbutton', () => {
      console.log('backbutton1');
  });
  }
  ngOnInit() {
    this.formInitializer();
  }
  formInitializer() {
    this.getData = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.matchOtherValidator('password')
        ]
      ]
    });
  }
  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }
SaveToDB() {
    this.clicked = true;
    this.loading = true;
    this.uuserService.userRegister(this.getData.value).subscribe(
      data => {
        console.log('got response from server', data);
        alert('Registeration Successfull!');
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      error => {
        this.clicked = false;
        this.loading = false;
        console.log('error', error);
        alert('Registeration Failed!User Already Exists');
      }
    );
  }
}
