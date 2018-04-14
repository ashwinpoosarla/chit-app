import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UpdateUserPage } from '../updateUser/updateUser';
import { UserService } from '../../common/services/user.services';

@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
  })
  export class ListPage {
    users;
    constructor(public navCtrl: NavController, private _user: UserService) {
        this.users = this._user.getUsers();
    }
  
    ngOnInit(){
        this.users = this._user.getUsers();
    }

    updateUser(u) {
        console.log('-----Modify user-----');
        console.log(u);
        this.navCtrl.push(UpdateUserPage, {isAdd: false, user: u});
    }

    addUser(){
        this.navCtrl.push(UpdateUserPage, {isAdd: true});
    }
  }
  