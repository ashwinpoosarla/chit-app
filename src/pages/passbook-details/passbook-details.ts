import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TransactionService } from '../../common/services/transaction.service';
import * as _ from 'underscore';

@Component({
  selector: 'page-passbook-details',
  templateUrl: 'passbook-details.html'
})
export class PassbookDetailsPage {
    associatedTransactions;
    selectedGroupNumber;
    constructor(public navCtrl: NavController, navParams: NavParams, private tS: TransactionService) { 
        let t = this.tS.getTransactions();
        this.selectedGroupNumber = navParams.get('groupNumber');
        this.associatedTransactions = _.findWhere(t, {GROUP_NUMBER: this.selectedGroupNumber});
        this.associatedTransactions = this.tS.getTransactions(); 
        console.log(this.associatedTransactions);
    }

    ngOnInit(){
      
    }
}
