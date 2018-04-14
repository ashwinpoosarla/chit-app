import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
        if(this.isAdd){
            //TODO add this.modifyUser
        }
        else{
            //TODO update this.modifyUser
        }
        console.log(this.modifyUser);
    }

    onDelete(){
        //Delete this.modifyUser

    }
  }
  