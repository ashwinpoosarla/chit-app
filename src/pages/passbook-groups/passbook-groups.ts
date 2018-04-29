import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { PassbookDetailsPage } from '../passbook-details/passbook-details';
import { TransactionService } from '../../common/services/transaction.service';

import * as _ from "underscore";

@Component({
  selector: 'page-passbook-groups',
  templateUrl: 'passbook-groups.html'
})
export class PassbookGroupPage {
    groups;
    transactions;
    associatedGroups;
    constructor(private http: HttpClient, private transactionService: TransactionService, public navCtrl: NavController) { 
        
    }

    ngOnInit(){
      //TODO - can be filtered using the uri params https://chit-posting.firebaseio.com/USERS.json?CLIENT_ID=0
      this.http.get('https://chit-posting.firebaseio.com/TRANSACTIONS.json').subscribe(data => {
        this.transactionService.setTransactions(this.transactionService.returnActualTransactions(data));
        this.transactionService = this.transactionService.getTransactions();
        this.associatedGroups = _.uniq(_.pluck(this.transactionService, 'GROUP_NUMBER'));
      });
    }

    transactionDetails(g) {
      this.navCtrl.push(PassbookDetailsPage, {groupNumber: g});
    }
}
