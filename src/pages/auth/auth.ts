import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import * as firebase from 'firebase';
import { UserService } from '../../common/services/user.services';
import { HomePage } from '../home/home';
import { ChangePin } from '../change-pin/change-pin';

//services

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
    
    //ref = firebase.database().ref('LOGON/');
    phoneNumber: number;
    users: any;
    showError: boolean = false;
    pin: string;

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
        this.users = this._users.getUsers();
    }

    validateUser(){
        //let user = this.users.find( (el) => {
        //    return el.PHONE == this.phoneNumber;
        //});
        //return !!user;
        this.showError = false;
        this.users = this._users.getUsers();
        //TODO validate user
        let u:any;
        for(let i = 0; i < this.users.length; i++){
            if(this.users[i].PHONE == this.phoneNumber){
                u = this.users[i];
                break;
            }
        }
        /*u = {
            ADDRESS: "bam",
            EMAIL: "abc@xyz.com",
            ID: 0,
            IS_ADMIN: true,
            IS_AGENT: true,
            IS_CUSTOMER: true,
            NAME: "Ashwin",
            PHONE: 9980983890,
            SECONDARY_PHONE: 8124639331
        }*/
        if(u && (u.PIN === this.pin)){
            this._users.setUser(u);
            this.logInSuccess();
        }
        else{
            console.error('LOGIN error');
            this.showError = true;
        }
    }

    logInSuccess() {
        if(this.pin.toString() !== '9999'){
            this.navCtrl.push(HomePage);
        }
        else{
            this.navCtrl.push(ChangePin);
        }
    }

    ngOnInit() {
        console.log('-----Initialize-----');
    }
}
