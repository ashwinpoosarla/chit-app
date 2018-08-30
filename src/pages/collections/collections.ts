import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { UserService } from '../../common/services/user.services';
import { GroupService } from '../../common/services/group.service';
import { TransactionService } from '../../common/services/transaction.service';

@Component({
  selector: 'page-collections',
  templateUrl: 'collections.html'
})
export class CollectionsPage {

    users: any;
    loggedInUser: any;
    transactions: any;
    newTransaction = {
        ID: null,
        AGENT_ID: null, //map user id to this while storing
        AMOUNT: null,
        CLIENT_ID: null,
        CREATE_DATE: null,
        GROUP_NUMBER: null,
        MEMBER_NUMBER: null,
        MODIFIED_DATE: null
    };
    selectedCustomer;
    selectedGroup;
    groups;
    constructor(public navCtrl: NavController, private _user: UserService, private gS: GroupService, private http: HttpClient, private tS: TransactionService) {
        this.users = this._user.getUsers();
        this.loggedInUser = this._user.getUser();
        this.http.get('https://chit-posting.firebaseio.com/GROUPS.json').subscribe(data => {
            this.gS.setGroups(this.gS.returnActualGroups(data) || {});
            this.groups = this.gS.getGroups();
        });
        this.http.get('https://chit-posting.firebaseio.com/TRANSACTIONS.json').subscribe(data => {
            this.tS.setTransactions(this.tS.returnActualTransactions(data));
            this.transactions = this.tS.getTransactions();
            let t = this.transactions.reduce((p, c) => {
                return (p.ID > c.ID) ? p : c;
            });
            this.newTransaction.ID = t.ID + 1; 
        });
        if(this.loggedInUser && this.loggedInUser.IS_AGENT){
            //Good to go
            this.newTransaction.AGENT_ID = this.loggedInUser.ID;
            //TODO fetch next transaction ID and set to this.newTransaction.ID
        }
        else{
            //GOTO error page
            console.error('Only Agent can see this page');
        }
    }

    ngOnInit(){
        
    }

    

    addTransaction() {
        this.newTransaction.AGENT_ID = this.loggedInUser.ID;
        this.newTransaction.CLIENT_ID = this.selectedCustomer.ID;
        this.newTransaction.CREATE_DATE = "05/01/2018"; //Format new Date() to this MM/DD/YYYY
        this.newTransaction.GROUP_NUMBER = this.selectedGroup.GROUP_NUMBER;
        this.newTransaction.MEMBER_NUMBER = 0; //TODO
        this.newTransaction.MODIFIED_DATE = "05/01/2018"; //Format new Date() to this MM/DD/YYYY
        //add to firebase TRANSACTION db
        console.log(this.newTransaction);
    }
}
