import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';
import { ListPage } from '../pages/list/list';
import { UpdateUserPage } from '../pages/updateUser/updateUser';

//services
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../common/services/user.services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    ListPage,
    UpdateUserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgbModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    ListPage,
    UpdateUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService
  ]
})
export class AppModule {}
