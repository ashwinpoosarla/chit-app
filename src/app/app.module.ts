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
import { GroupPage } from '../pages/groups/groups';
import { MembersPage } from '../pages/members/members';
import { UpdateUserPage } from '../pages/updateUser/updateUser';
import { PassbookGroupPage } from '../pages/passbook-groups/passbook-groups';
import { PassbookDetailsPage } from '../pages/passbook-details/passbook-details';

//services
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../common/services/user.services';
import { GroupService } from '../common/services/group.service';
import { TransactionService } from '../common/services/transaction.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    ListPage,
    UpdateUserPage,
    GroupPage,
    MembersPage,
    PassbookGroupPage,
    PassbookDetailsPage
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
    UpdateUserPage,
    GroupPage,
    MembersPage,
    PassbookGroupPage,
    PassbookDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    GroupService,
    TransactionService
  ]
})
export class AppModule {}
