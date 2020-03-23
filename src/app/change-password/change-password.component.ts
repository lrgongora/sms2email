import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MaterialModule } from '../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    changePasswordForm;

  constructor(private formBuilder : FormBuilder, private http : HttpClient, private route : Router, public snackBar : MatSnackBar) { 
    this.changePasswordForm = formBuilder.group({
      username: ['', Validators.required],
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required]
    });

   }

  ngOnInit(): void {
  }


  changePassword(data) {
      this.http.post('/auth/changePassword', data).subscribe(
          res => {
              if(res['status'] == "success"){
                this.snackBar.open(res['message'], "Dismiss", {duration: 5000});
                this.route.navigate(['admin/dashboard']);
              } else if(res['status'] == "fail"){
                this.snackBar.open(res['message'], "Dismiss", {duration: 5000});
              } else if(res['status'] == "error") {
                this.snackBar.open(res['message'].message, "Dismiss", {duration: 5000});
              }
          },
          (err : HttpErrorResponse) => {
                this.snackBar.open(err.error.message.message, "Dismiss", {duration: 5000});
          }
      )
  }

}
