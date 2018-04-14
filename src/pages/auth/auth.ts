import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import * as firebase from 'firebase';
import { UserService } from '../../common/services/user.services';
import { HomePage } from '../home/home';

//services

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
    
    //ref = firebase.database().ref('LOGON/');
    phoneNumber: number = null;
    users: number[];

    constructor(public navCtrl: NavController, private _users: UserService) {
        // The start method will wait until the DOM is loaded.
        //this.ui.start('#firebaseui-auth-container', this.authConfig);
        /*this.ref.on('value', (response) => {
            console.log('-------------------------');
            _users.setUsersFromDB(response.val());
            this.users = _users.getUsers();
        }, (error) => {
            console.log('User error' + error);
        });*/
    }

    validateUser(){
        //let user = this.users.find( (el) => {
        //    return el.PHONE == this.phoneNumber;
        //});
        //return !!user;
        let loggedUser = {
            "EMAIL": "shreeganeshchitfund@gmail.com",
            "ID": 0,
            "IS_ADMIN": true,
            "IS_AGENT": true,
            "IS_CUSTOMER": true,
            "NAME": "UsER1",
            "PHONE": 9980983890,
            "SECONDARY_PHONE": 8124639331
        };
        //TODO validate user
        console.log(this._users.getUsers());
        this._users.setUser(loggedUser);
        this.logInSuccess();
    }

    logInSuccess() {
        this.navCtrl.push(HomePage);
    }

    ngOnInit() {
        console.log('-----Initialize-----');
    }
}
