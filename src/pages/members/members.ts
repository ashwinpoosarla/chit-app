import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import * as _ from 'underscore';
import * as firebase from 'firebase';
import { GroupService } from '../../common/services/group.service';
import { UserService } from '../../common/services/user.services';

@Component({
  selector: 'page-members',
  templateUrl: 'members.html'
})
export class MembersPage {
    navparams;
    selectedGroup;
    users;
    selectedUsers;
    constructor(navParams: NavParams, private groupService: GroupService, private us: UserService) {
        this.navparams = navParams;
        this.selectedGroup = this.groupService.fetchGroupAndMembers(this.navparams.get('group').GROUP_NUMBER);
        this.users = this.us.getUsers();
        console.log(this.selectedGroup);
    }

    ngOnInit(){
        
    }

    generateMemberId(){
        let id = 1;
        if(this.selectedGroup.MEMBERS.length > 0){
            let temp = _.pluck(this.selectedGroup.MEMBERS, 'MEMBER_ID');
            id = Math.max.apply(null, temp);
        }
        return id+1;
    }

    addToDBGroup(newMember){
        let dbRef = firebase.database().ref('GROUPS/'+this.selectedGroup.GROUP_NUMBER+'/MEMBERS');
        dbRef.child(newMember.ID).set({MEMBER_ID: newMember.MEMBER_ID, USER_ID: newMember.ID}, (error) => {
            if(error){
                console.error('Unable to add member to group');
                console.error(error);
            }
            else{
                console.log('Member added to group');
            }
        })
    }

    onChangeList() {
        console.log(this.selectedUsers);
        let isUserAlreadyMember;
        for (let i=0; i<this.selectedUsers.length; i++){
            isUserAlreadyMember = this.selectedGroup.MEMBERS.find( (mem) => {
                return mem.ID === this.selectedUsers[i].ID;
            } );
            if(isUserAlreadyMember){
                continue;
            }
            let nextID = this.generateMemberId();
            let newMember = Object.assign({MEMBER_ID: nextID, USER_ID: this.selectedUsers[i].ID}, this.selectedUsers[i])
            this.selectedGroup.MEMBERS.push(newMember);
            this.addToDBGroup(newMember);
        }
    }
}
