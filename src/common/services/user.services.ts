import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'underscore';
import { environment as ENV } from '../../environment/environment';
//import * as firebase from 'firebase';

@Injectable()
export class UserService {
  users = [];
  isProd: boolean = false;
  user: {};
  
  constructor(private http: HttpClient) {
    this.isProd = ENV.production;
  }

  convertObjectToArray(object) {
    let a = [];
    a = Object.keys(object).map( i => object[i]);
    a = a.filter(n => {
      return n != null && n != undefined;
    });
    return a;
  }

  generateId(){
    let id = 1;
    if(this.users.length > 0){
      let temp = _.pluck(this.users, 'ID');
      id = Math.max.apply(null, temp);
    }
    return id+1;
  }

  fetchUsers() {
    this.http.get('https://chit-posting.firebaseio.com/USERS.json').subscribe(data => {
      this.setUsers(this.returnActualUsers(data) || {});
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
    u = this.convertObjectToArray(u);
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