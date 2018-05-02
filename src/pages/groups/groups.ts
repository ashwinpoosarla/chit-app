import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { GroupService } from '../../common/services/group.service';
import { MembersPage } from '../members/members';
import * as _ from 'underscore'; 

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupPage {
    groups;
    editPage:boolean = false;
    newGroup = {
        GROUP_NUMBER: null,
        ID: null,
        MEMBERS: []
    };
    groupNo: number;
    constructor(private groupService: GroupService, private http: HttpClient, public navCtrl: NavController) { 
        this.http.get('https://chit-posting.firebaseio.com/GROUPS.json').subscribe(data => {
            this.groupService.setGroups(this.groupService.returnActualGroups(data) || {});
            this.groups = this.groupService.getGroups();
        });
    }

    ngOnInit(){
        
    }

    fetchMemberDetails(g) {
        this.navCtrl.push(MembersPage, {group: g});
    }

    addGroup() {
        this.editPage = true;
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
}
