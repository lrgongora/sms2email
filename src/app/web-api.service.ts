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

     addUser(user){
         this.http.post(this.BASE_URL + "/users", user).subscribe(
         res => {
            this.getUsers();
            this.getLogs();
            this.snackBar.open("Success!", "Dismiss", {duration: 5000});
         },
         (err : HttpErrorResponse) => {
            this.snackBar.open("Something went wrong!", "Dismiss", {duration: 5000});
         }
     )
  }

  updateUser(id, user){
         this.http.put(this.BASE_URL + "/users/" + id, user).subscribe(
         res => {
            this.getUsers();
            this.getLogs();
            this.snackBar.open("Successfully updated!", "Dismiss", {duration: 5000});
         },
         (err : HttpErrorResponse) => {
            this.snackBar.open("Something went wrong!", "Dismiss", {duration: 5000});
         }
     )
  }

  deleteUser(id){
         this.http.delete(this.BASE_URL + "/users/" + id).subscribe(
         res => {
            this.getUsers();
            this.getLogs();
            this.snackBar.open("Deleted!", "Dismiss", {duration: 5000});
         },
         (err : HttpErrorResponse) => {
            this.snackBar.open("Something went wrong!", "Dismiss", {duration: 5000});
         }
     )

  }

}
