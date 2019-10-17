import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRegistered: Array<User> = [];
  usersLength: number = 0;

  constructor() { }

  saveUser(user: User) {
    let userFound = this.userRegistered.find(user => user.email == user.email);
    if (userFound) {
      return {
        code: '301',
        message: 'error'
      }
    }
    let currentLength = this.userRegistered.push(user);
    if (currentLength && (currentLength - this.usersLength) === 1) {
      this.usersLength++;
      return {
        code: '200',
        message: 'success'
      };
    } else {
      return {
        code: '500',
        message: 'error'
      };
    }
  }

  getUsers(): Array<User> {
    return this.userRegistered
  }

  getUserToAuth(email: string, password: string): any {
    let userFound: User = this.userRegistered.find(user => user.email == email && user.password == password)
    const resObsevable = new Observable((observer) => {
      if (!userFound) {
        console.log("Usuario no existe");
        observer.complete();
      } else {
        observer.next({
          body: {
            token: "asdfqwerzxcv",
            usuario: userFound
          }
        })
      }
    })

    return resObsevable;
  }

  cleanData() {
    this.userRegistered = [];
  }
}
