import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { GroupService } from '../../common/services/group.service';

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {
    navparams;
    selectedGroup;
    constructor(navParams: NavParams, private groupService: GroupService) {
        this.navparams = navParams;
        this.selectedGroup = this.groupService.fetchGroupAndMembers(this.navparams.get('group').GROUP_NUMBER);
        console.log(this.selectedGroup);
    }

    ngOnInit(){
        
    }
}
