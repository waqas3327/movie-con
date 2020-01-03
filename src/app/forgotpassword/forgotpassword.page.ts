import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from '../sdk/custom/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private service: UserService) { this.backbutton(); }
  clicked = false;
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
    this.forgotPasswordForm = this.formBuilder.group({
       email: [null, [Validators.required, Validators.email]]
    });
  }
  forgotPassword() {
    try {
    this.clicked = true;
    const forgotData = this.forgotPasswordForm.value;
    console.log('ForgotPaswordData:', forgotData);
    this.service.userForgotPassword(forgotData).subscribe(
      data => {
        console.log('got response from server', data);
        alert('Password sent! Check your Email');
        this.clicked = false;
      },
      error => {
        console.log('error', error);
        alert('User does not exist! Please sign up first.');
        this.clicked = false;
      }
    );
    } catch (ex) {
        console.log('ex', ex);
      }
  }
}
