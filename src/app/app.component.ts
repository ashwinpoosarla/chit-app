import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';
//import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
//import { Agent } from '../pages/agent/agent';
import * as firebase from 'firebase';
import { UserService } from '../common/services/user.services';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = AuthPage;
  //rootPage:any = HomePage;
  //rootPage:any = Agent;
  constructor(platform: Platform, private _users: UserService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.styleDefault();
      //splashScreen.hide();
      this._users.fetchUsers();
    });
    firebase.initializeApp(fireConfig);
  }
}

