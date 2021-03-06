import { Injectable } from '@angular/core';
import { UserService } from './user.services';
import { GroupService } from './group.service';
import { environment as ENV} from '../../environment/environment';

@Injectable()
export class TransactionService {
    private users;
    isProd: boolean = false;
    private groups;
    transations:any;

    selectedGroup;
    constructor(private userService: UserService, private groupService: GroupService) {
        this.isProd = ENV.production;
        this.users = this.userService.getUsers();
        this.groups = this.groupService.getGroups();
    }

    ngOnInit() {

    }

    convertObjectToArray(object) {
        let a = [];
        a = Object.keys(object).map( i => object[i]);
        a = a.filter(n => {
          return n != null && n != undefined;
        });
        return a;
    }

    returnActualTransactions(t) {
        t = this.convertObjectToArray(t);
        if(this.isProd){
            t.splice(0, 1);
        }
        return t; 
    }

    setTransactions(t) {
        this.transations = t;
    }

    getTransactions() {
        return this.transations;
    }

} 