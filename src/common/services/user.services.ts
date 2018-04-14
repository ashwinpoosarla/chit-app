import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as firebase from 'firebase';

@Injectable()
export class UserService {
  users = [];
  isProd: boolean = false;
  user: {};
  
  constructor(private http: HttpClient) {

  }

  fetchUsers() {
    this.http.get('https://chit-posting.firebaseio.com/USERS.json').subscribe(data => {
      this.setUsers(this.returnActualUsers(data) || []);
    });
  }

  //use for firebase calls only to splice out the dummy data in index 0
  setUsersFromDB(u) {
    if(this.isProd){
      u.splice(0, 1);
    }
    this.users = u;
  }

  returnActualUsers(u){
    if(this.isProd){
      u.splice(0, 1);
    }
    return u; 
  }

  setUsers(u){
    this.users = u;
  }

  getUsers(){
    return this.users;
  }

  setUser(u){
    this.user = u;
  }

  getUser() {
    return this.user;
  }

}