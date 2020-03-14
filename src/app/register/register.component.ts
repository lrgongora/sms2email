import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http'
import { response } from 'express';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private route : Router, private authService : AuthService) {

    this.registerForm = this.formBuilder.group({
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
    })

   }

  ngOnInit(): void {
  }

  onSubmit(data){
    this.http.post('/api/register', data).subscribe(
      (res) => {
        console.log(res['user']);
        if(res['status'] == "success"){
          this.authService.setUserInfo({'user' : res['user']});
          this.route.navigate(['user/dashboard']);
        }
      },
        (err : HttpErrorResponse) => {
          console.log(err.error);
        }

    )}

    }
