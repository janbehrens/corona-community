import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  loggedIn: boolean;
  private loginUrl = `${environment.backendUrl}/login`;
  private registerUrl = `${environment.backendUrl}/register`;

  constructor(private http: HttpClient) { }

  async doLogin(credentials: { username: string, password: string }) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let body = new URLSearchParams();
    body.append('username', credentials.username);
    body.append('password', credentials.password);

    const user = await this.http.post<User>(this.loginUrl, body.toString(), options).toPromise();
    this.user = user;
    this.loggedIn = true;
    return user;
  }

  doLogout() {
    this.user = null;
    this.loggedIn = false;
  }

  async doRegister(userdata: { username: string, password: string, email?: string }) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    let body = new URLSearchParams();
    body.append('username', userdata.username);
    body.append('password', userdata.password);
    body.append('email', userdata.email);

    const user = await this.http.post<User>(this.registerUrl, body.toString(), options).toPromise();
    this.user = user;
    this.loggedIn = true;
    return user;
  }
}
