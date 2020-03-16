import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm;
  constructor(private authService : AuthService, private route : Router, private formBuilder : FormBuilder) {
    this.loginForm = formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
  }

  login(data){
    this.authService.validate(data.username, data.password)
    .then((response) => {
      console.log(response);
      this.authService.setUserInfo({'user' : response['user']});
      this.route.navigate(['user/dashboard']);
    })
  }

}
