import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import { UserService } from '../../common/services/user.services';

@Component({
    selector: 'page-change-pin',
    templateUrl: 'change-pin.html'
})
export class ChangePin {
    newPin: number;
    confirmPin: number;
    currentUser: any; 
    errors: any = {
        INVALID_PIN: 'Please enter a valid Pin',
        INVALID_CONFIRM_PIN: 'Please check if pin and confirm pin are same',
        DO_NOT_SET_DEFAULT: 'Please change your pin'
    }
    errorMessage: string = '';
    constructor(public navCtrl: NavController, public us: UserService){
        this.currentUser = this.us.getUser();
    }

    setPintoDb() {
        //TODO set pin to db
        let modifiedUser = Object.assign({}, this.currentUser);
        modifiedUser.PIN = this.newPin;
        let dbRef = firebase.database().ref('USERS/');
        dbRef.child(this.currentUser.ID.toString()).update(modifiedUser, function(error) {
            if(error){
                console.error("Could not update the PIN" + error);
            }
            else{
                this.us.setUser(modifiedUser);
                //this.navCtrl.pop();
                this.navCtrl.remove();
                this.navCtrl.push(HomePage);
            }
        }.bind(this))
    }

    validatePin(){
        if(this.newPin.toString().length !== 4){
            this.errorMessage = this.errors.INVALID_PIN;
        }
        else if(this.newPin !== this.confirmPin){
            this.errorMessage = this.errors.INVALID_CONFIRM_PIN;
        }
        else if(this.newPin.toString() === '9999'){
            this.errorMessage = this.errors.DO_NOT_SET_DEFAULT;
        }
        else{
            this.setPintoDb();
            this.errorMessage = '';
        }
    }
}