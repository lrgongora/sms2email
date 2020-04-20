import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    isAdmin: Boolean;

    constructor(private http: HttpClient, private route: Router) {}

    public isAuthenticated(): Boolean {
        let userInfo = localStorage.getItem("user");
        if (userInfo) {
            return true;
        } else {
            return false;
        }
    }

    public setUserInfo(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    public setToken(token) {
        localStorage.setItem("token", token);
    }

    public getUser() {
        return localStorage.getItem("user");
    }

    public validate(username, password) {
        return this.http.post('/auth/login', {
            "username": username,
            "password": password
        }).toPromise();
    }

    public logOut() {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.route.navigate(['login']);
        return this.http.get('/auth/logout').subscribe();
    }

}