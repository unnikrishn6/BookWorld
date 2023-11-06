import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  url="http://localhost:3000"

  private userNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public userName$: Observable<string> = this.userNameSubject.asObservable();

  setUserName(userName: any) {
    this.userNameSubject.next(userName);
  }

  signUp(username: any, password: any) {
    const user = { username, password };
    return this.http.post(`${this.url}/api/signup`, user);
  }

  login(username: any, password: any) {
    const url = `${this.url}/api/login`;
    const body = { username, password };
    return this.http.post(url, body);
  }
  
  // In the UserService, we create a BehaviorSubject named userNameSubject to hold the user's name. 
  // We also expose an Observable named userName$ to allow other components to subscribe to changes in the user's name. 
  // The setUserName method updates the userNameSubject with the new user name.
}
