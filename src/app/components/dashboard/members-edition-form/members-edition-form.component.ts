import { Component, OnInit } from '@angular/core';

import { AssetsService } from 'src/app/services/assets.service';
import { MembersService } from 'src/app/services/members.service';

const DURATION_DISPLAYING = 6000;

@Component({
  selector: 'app-members-edition-form',
  templateUrl: './members-edition-form.component.html',
  styleUrls: ['./members-edition-form.component.scss']
})
export class MembersEditionFormComponent implements OnInit {
  teamPonthe = [];

  successEdition = false;
  failureEdition = false;
  visibleModal = false;

  constructor(
    private assetsService: AssetsService,
    private membersService: MembersService) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.membersService.getMembers().subscribe(
      (res: { team_ponthe }) => {
        this.teamPonthe = res.team_ponthe;
      },
      (error) => { console.log(error); }
    );
  }

  arrayToJson(articles: any) {
    let finalJson = {};
    for (let i = 0; i < articles.length; i++) {
      finalJson[i + 1] = articles[i];
    }
    finalJson = { articles: finalJson };
    return finalJson;
  }

  updateMember(teamIndex: number, memberIndex: number, e: Event) {
    // @ts-ignore
    this.teamPonthe[teamIndex].members[memberIndex] = e.target.value;
  }

  addTeam(teamIndex: number) {
    const numberOfTeams = this.teamPonthe.length;
    const indexOfNewTeam = teamIndex == 0 ? 0 : numberOfTeams;
    const year = teamIndex == 0
      ? '0' + (parseInt(this.teamPonthe[0].year) + 1).toString()
      : '0' + (parseInt(this.teamPonthe[numberOfTeams - 1].year) - 1).toString();

    const emptyTeam = {
      year: year,
      year_id: 'p' + year,
      members: [''],
      prev_year_id: 'p0' + (parseInt(year) - 1).toString()
    };
    this.teamPonthe.splice(indexOfNewTeam, 0, emptyTeam);
  }

  addMember(teamIndex: number) {
    const membersList = this.teamPonthe[teamIndex].members;
    membersList.push('')
    this.teamPonthe[teamIndex].members = membersList
  }
  
  removeMember(teamIndex: number, memberIndex: number) {
    const membersList = this.teamPonthe[teamIndex].members;
    membersList.splice(memberIndex, 1);
    this.teamPonthe[teamIndex].members = membersList
    if (membersList.length === 0) {
      this.teamPonthe.splice(teamIndex, 1);
    }
  }

  openConfirmationModal() {
    this.visibleModal = true;
  }

  closeCancelModal() {
    this.visibleModal = false;
  }

  onSubmitMembers() {
    const teamJson = { members: { team_ponthe: this.teamPonthe } };
    this.assetsService.editMembers(teamJson).subscribe(
      res => {
        this.successEdition = true;
        setTimeout(() => this.successEdition = false, DURATION_DISPLAYING);
      },
      error => {
        this.failureEdition = true;
        setTimeout(() => this.failureEdition = false, DURATION_DISPLAYING);
      }
    );
    this.visibleModal = false;
  }
}
