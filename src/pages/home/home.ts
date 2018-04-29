import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import * as firebase from 'firebase';
import { ListPage } from '../list/list';
import { GroupPage } from '../groups/groups';
import { PassbookGroupPage } from '../passbook-groups/passbook-groups';
import { UserService } from '../../common/services/user.services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //ref = firebase.database().ref('USERS');
  //value = []; 
  user: {};
  constructor(public navCtrl: NavController, private _user: UserService) {
    /*this.ref.on('value', response => {
      console.log('----------------------');
      console.log(response.val());
      this.value = response.val()['01'];
    });*/
    //this.navCtrl.setRoot(HomePage);
    this.user = this._user.getUser();
  }

  navigateToList(){
    this.navCtrl.push(ListPage);
  }

  navigateToGroups() {
    this.navCtrl.push(GroupPage);
  }

  navigateToPassbookGroups() {
    this.navCtrl.push(PassbookGroupPage);
  }

  ngOnInit(){
    
  }
}
