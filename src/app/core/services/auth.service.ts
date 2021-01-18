import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/pages/authentication/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURLBase + '/users';
  tokenURL = environment.apiURLBase + environment.tokenURL;

  clientId = environment.clientId;
  clientSecret = environment.clientSecret;

  jwtHeler: JwtHelperService = new JwtHelperService (); 

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(){
    const token = this.getToken();
    if(token){
      const isExpirated = this.jwtHeler.isTokenExpired(token);
      return !isExpirated;
    }
    return false;
  }

  getToken(){
    const tokenString = localStorage.getItem('access_token');
    
    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }
  
  logout(){
    localStorage.removeItem('access_token');
  }

  registerWithData(user: User){
    this.logout();
    return this.http.post(`${this.apiURL}/populate`, user);
  }

  register(user: User){
    this.logout();
    return this.http.post(this.apiURL, user);
  }

  login(email: string, password: string){
    this.logout();

    const params = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return this.http.post(this.tokenURL, params.toString(), { headers });

  }
}
