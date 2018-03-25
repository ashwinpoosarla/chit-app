import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';

const fireConfig = {
  apiKey: 'AIzaSyBV1xnZH0ZspVXeB-_ddKVZehKHnzWoR2k',
  authDomain: 'chit-posting.firebaseapp.com',
  databaseURL: 'https://chit-posting.firebaseio.com/',
  projectId: 'chit-posting',
  storageBucket: 'chit-posting.appspot.com',
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(fireConfig);
  }
}

