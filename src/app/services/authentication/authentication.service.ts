import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../../models/user/user';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string){
    /*return this.http.post<any>('/auth/login', {"email": email, "password": password})
    .pipe(map(res => {
      console.log("Usuario respuesta", res);
      
      if (res && res.body.token) {
        localStorage.setItem('currentUser', JSON.stringify(res.body.usuario));
        this.currentUserSubject.next(res);
      }
      return res;
    }));*/
    return this.userService.getUserToAuth(email, password)
    .pipe(map(res => {
      console.log(res['body']);

      if (res && res['body'].token) {
        localStorage.setItem('currentUser', JSON.stringify(res['body'].usuario));
        this.currentUserSubject.next(res['body'].usuario);
      }
      return res;
    }))
   }

  logout(){
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null);
  }
}
