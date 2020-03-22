import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthGuardService} from '../auth-guard.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isAdmin;
  loginForm;
  constructor(private authService : AuthService, private authGuard : AuthGuardService, private route : Router, private formBuilder : FormBuilder, public snackBar : MatSnackBar) {
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
        if(response['status'] === "info"){
           this.snackBar.open(response['message'].message, "Dismiss", {duration: 5000});
        } else if(response['status'] === "fail") {
            this.snackBar.open(response['message'], "Dismiss", {duration: 5000});
        } else if(response['status'] === "sucess") {
      console.log(response);
      this.authService.setUserInfo({'user' : response['user'], 'token' : response['token']});
      if(response['user'].isAdmin){
          this.route.navigate(['admin/dashboard']);
      } else {
      this.route.navigate(['user/dashboard']);
      }
    }},
    (err) =>{
        this.snackBar.open(err.error.message.message, "Dismiss", {duration: 5000});
    })
  }

}
