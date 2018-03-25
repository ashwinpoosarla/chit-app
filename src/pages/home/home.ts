import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ref = firebase.database().ref('USERS');
  value = [];
  constructor(public navCtrl: NavController) {
    this.ref.on('value', response => {
      console.log('----------------------');
      console.log(response.val());
      this.value = response.val()['01'];
    });
    //this.navCtrl.setRoot(HomePage);
  }

}
