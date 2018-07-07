import { Injectable } from '@angular/core';
import { UserService } from './user.services';
import * as _ from 'underscore';

@Injectable()
export class GroupService {
    private users;
    isProd: boolean = false;
    groups;
    selectedGroup;
    constructor(private _userService: UserService) {
        this.users = this._userService.getUsers();
    }

    convertObjectToArray(object) {
        let a = [];
        a = Object.keys(object).map( i => object[i]);
        a = a.filter(n => {
          return n != null && n != undefined;
        });
        return a;
    }

    returnActualGroups(g) {
        g = this.convertObjectToArray(g);
        if(this.isProd){
            g.splice(0, 1);
        }
        return g; 
    }

    setGroups(g) {
        this.groups = g;
    }

    getGroups() {
        return this.groups;
    }

    getMembers() {

    }

    fetchMemberDetails(member) {
        let m;
        m = _.findWhere(this.users, {ID: member.USER_ID});
        return m;
    }

    fetchGroupAndMembers(gNo) {
        let g = {
            MEMBER_ID: 0,
            USER_ID: 0,
            MEMBERS: []
        };
        g = _.findWhere(this.groups, {GROUP_NUMBER: gNo});
        let members = g.MEMBERS || [];
        for(let i = 0; i < members.length; i++){
            g.MEMBERS[i] = Object.assign(g.MEMBERS[i], this.fetchMemberDetails(members[i]));
        }
        return g;
    }


} 