import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html'
})
export class AuthPage {
    ui = new firebaseui.auth.AuthUI(firebase.auth());
    authConfig = {
        callbacks: {
            signInSuccess: function(currentUser, credential, redirectUrl){
                // User successfully signed in.
                // Return type determines whether we continue the redirect automatically
                // or whether we leave that to developer to handle.
                console.log(currentUser);
                console.log('*****************************');
                console.log(credential);
                console.log('*****************************');
                console.log(redirectUrl);
                return true;
            },
            uiShown: function() {
                // The widget is rendered.
                // Hide the loader.
                document.getElementById('loader').style.display = 'none';
            }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
        signInSuccessUrl: '<url-to-redirect-to-on-success>',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          {
              provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
              defaultCountry: 'IN'
          }
        ]
    };
    constructor(public navCtrl: NavController) {
        // The start method will wait until the DOM is loaded.
        this.ui.start('#firebaseui-auth-container', this.authConfig);
    }
}
