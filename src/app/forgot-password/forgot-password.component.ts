import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {


    forgotPasswordForm;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private route : Router, public snackBar : MatSnackBar) { 
    this.forgotPasswordForm = formBuilder.group({
      username: ['', Validators.required]
    });

   }

  ngOnInit(): void {
  }

  forgotPassword(data){
            this.http.post('/auth/forgotPassword', data).subscribe(
          res => {
              if(res['status'] == "success"){
                this.snackBar.open("Please, check your email!", "Dismiss", {duration: 5000});
                this.route.navigate(['/login']);
              } else if(res['status'] == "fail"){
                this.snackBar.open(res['message'], "Dismiss", {duration: 5000});
              }
          },
          (err : HttpErrorResponse) => {
                this.snackBar.open(err.error.message.message, "Dismiss", {duration: 5000});
          }
      )
  }

}
