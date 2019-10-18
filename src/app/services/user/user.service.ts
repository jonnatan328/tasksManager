import { Injectable } from '@angular/core';
import { User } from '../../models/user/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userRegistered: Array<User> = [];
  usersLength: number = 0;

  constructor() { 
    this.userRegistered.push(new User("Jonnatan", "Rios", "jrios328@gmail.com", "3217921137", "12345678"))
  }

  /**
   * Valida que el usuario no se encuentre registrado y lo guarda en memoria
   * @param user 
   */
  saveUser(user: User) {
    let userFound = this.userRegistered.find(userSaved => user.email == userSaved.email);
    console.log('userFound: ', userFound);
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

  /**
   * Busca al usuario en memoria por email y contrasena
   * @param email 
   * @param password 
   */
  getUserToAuth(email: string, password: string): any {
    let userFound: User = this.userRegistered.find(user => user.email == email && user.password == password)
    const resObsevable = new Observable((observer) => {
      if (!userFound) {
        observer.error({
          code: "400",
          message: 'User not found'
        });
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
