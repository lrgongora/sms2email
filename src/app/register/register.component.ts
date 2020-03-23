import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(private formBuilder : FormBuilder, public snackBar : MatSnackBar, private http : HttpClient, private route : Router, private authService : AuthService) {

    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      authorizationCode: ''
    })

   }

  ngOnInit(): void {
  }

  onSubmit(data){
    this.http.post('/auth/register', data).subscribe(
      (res) => {
        console.log(res['user']);
        if(res['status'] == "success"){
          this.snackBar.open("Please, check for an email verification code!", "Dismiss", {duration: 5000});
          this.route.navigate(['/login']);
        } else {
          this.snackBar.open(res['message'], "Dismiss", {duration: 5000});
        }
      },
        (err : HttpErrorResponse) => {
          console.log(err.error);
        }

    )}

    }
