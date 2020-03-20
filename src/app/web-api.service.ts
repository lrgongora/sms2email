import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {
    BASE_URL = "/api"
  usersSubject = new Subject();
  logsSubject = new Subject();

  constructor(private http : HttpClient, private snackBar : MatSnackBar) { }

   getUsers(){
         this.http.get(this.BASE_URL + "/users").subscribe(
         res => {
            this.usersSubject.next(res);
            console.log(this.usersSubject)
            console.log(res);
         },
         (err : HttpErrorResponse) => {
            this.snackBar.open("Something went wrong!", "Dismiss", {duration: 5000});
         }
     )
  }

  getLogs(){
         this.http.get(this.BASE_URL + "/logs").subscribe(
         res => {
            this.logsSubject.next(res);
         },
         (err : HttpErrorResponse) => {
            this.snackBar.open("Something went wrong!", "Dismiss", {duration: 5000});
         }
     )
  }

}
