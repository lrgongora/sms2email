import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private route : Router) { }

  public isAuthenticated () : Boolean {
    let userInfo = localStorage.getItem("userInfo");
    if(userInfo && JSON.parse(userInfo)){
      return true;
    } else {
      return false;
    }
  }

  public setUserInfo(user) {
    localStorage.setItem("userInfo", JSON.stringify(user));
  }

  public getUser(){
      return localStorage.getItem("userInfo");
  }

  public validate(username, password){
    return this.http.post('/api/login', {"username" : username, "password": password}).toPromise();
  }

  public logOut(){
      localStorage.removeItem("userInfo");
      this.route.navigate(['login']);
  }

}
