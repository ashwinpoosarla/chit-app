import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { PassbookDetailsPage } from '../passbook-details/passbook-details';
import { TransactionService } from '../../common/services/transaction.service';

import * as _ from "underscore";
import { UserService } from '../../common/services/user.services';

@Component({
  selector: 'page-passbook-groups',
  templateUrl: 'passbook-groups.html'
})
export class PassbookGroupPage {
    groups;
    transactions;
    associatedGroups;
    user: any;
    constructor(private http: HttpClient, private transactionService: TransactionService, public navCtrl: NavController, 
      private uS: UserService) { 
        
    }

    ngOnInit(){
      //TODO - can be filtered using the uri params https://chit-posting.firebaseio.com/USERS.json?CLIENT_ID=0
      this.user = this.uS.getUser();
      this.http.get('https://chit-posting.firebaseio.com/TRANSACTIONS.json').subscribe(data => {
        this.transactionService.setTransactions(this.transactionService.returnActualTransactions(data));
        let t = this.transactionService.getTransactions(); 
        this.transactions = _.where(t, {CLIENT_ID: this.user.ID});
        this.associatedGroups = _.uniq(_.pluck(this.transactions, 'GROUP_NUMBER'));
      });
    }

    transactionDetails(g) {
      this.navCtrl.push(PassbookDetailsPage, {groupNumber: g});
    }
}
