import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { ListPage } from '../list/list';
import { UserService } from '../../common/services/user.services';

@Component({
    selector: 'page-updateUser',
    templateUrl: 'updateUser.html'
  })
  export class UpdateUserPage {
    navParams;
    isAdd: boolean = false;
    modifyUser;
    loggedUser;
    constructor(public navCtrl: NavController, navParams: NavParams, private _user: UserService) {
        this.navParams = navParams;
        this.isAdd = this.navParams.get('isAdd');
        let temp = {
            "EMAIL": "",
            "IS_ADMIN": false,
            "IS_AGENT": false,
            "IS_CUSTOMER": false,
            "NAME": "",
            "PHONE": null,
            "SECONDARY_PHONE": null
        };
        this.modifyUser = this.isAdd ? temp : this.navParams.get('user');
        this.loggedUser = this._user.getUser();
    }
  
    ngOnInit(){
      
    }

    onSubmit(){
        let dbRef = firebase.database().ref('USERS/');
        let idx = 1;
        
        if(this.isAdd){
            idx = this._user.generateId();
            this.modifyUser.ID = idx;
            dbRef.child(idx.toString()).set(this.modifyUser, function(error){
                if (error) {
                    console.error("User could not be added." + error);
                  } else {
                        console.log('-----User added-----');
                        this._user.fetchUsers();
                  }
            }.bind(this));
        }
        else{
            dbRef.child(this.modifyUser.ID.toString()).update(this.modifyUser, function(error){
                if (error) {
                    console.error("User could not be modified." + error);
                  } else {
                    console.log('-----User updated-----');
                    this._user.fetchUsers();
                  }
            }.bind(this))
        }
        console.log(this.modifyUser);
    }

    onDelete(){
        //Delete this.modifyUser
        let dbRef = firebase.database().ref('USERS/');
        dbRef.child(this.modifyUser.ID.toString()).remove(function(error){
            if (error) {
                console.error("User could not be deleted." + error);
            } else {
                console.log('-----User deleted-----');
                this._user.fetchUsers();
            }
        }.bind(this));
    }

    gotoList(){
        this.navCtrl.push(ListPage);
    }
  }
  