import { Component } from '@angular/core';
import * as _ from 'underscore';
import { GroupService } from '../../common/services/group.service';
import { UserService } from '../../common/services/user.services';

@Component({
    selector: 'page-add-group',
    templateUrl: 'add-group.html'
})
export class AddGroupPage {
    groups:any;
    groupNo:any;
    newGroup = {
        GROUP_NUMBER: null,
        ID: null,
        MEMBERS: []
    };
    users: any;

    constructor(private gS: GroupService, private uS: UserService) { 
        this.groups = this.gS.getGroups();
        this.users = this.uS.getUsers();
    }

    ngOnInit(){
        
    }

    add(){
        let g = _.pluck(this.groups, 'GROUP_NUMBER');
        g = g.map((item) => {
            return Number(item.replace(/[a-z]/i, ''));
        });

        if(!g.includes(Number(this.groupNo))){
            this.newGroup.GROUP_NUMBER = 'S' + this.groupNo;
            this.newGroup.ID = 'S' + + this.groupNo;
            
        }
        else{
            console.error('Already existing group');
        }
    }

    addMember() {
        
    }
}