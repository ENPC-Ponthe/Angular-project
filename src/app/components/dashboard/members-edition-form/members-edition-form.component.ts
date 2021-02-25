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
  teamPontheRaw = {
    "team_ponthe": [
        {
            "year": "022",
            "year_id": "p022",
            "members": [
                "Président : Adrien Sadé",
                "Vice-Présidente Images : Louise Eymery",
                "Vice-Présidente Création : Sarah Ropert",
                "Trésorier : Jean-Paul Eisenmann",
                "Respo Communication : Lise Dousset",
                "Respo Matériel : Cyril Nederveen",
                "Respo Formation : Brieuc Valokuvaaja",
                "Respo Drone : Hadrien Thébault",
                "Respos Retouche : Romain Chaussonnier, Valentin Cheval",
                "Monteurs : Emma-Jane Touhey, Victor Guichard, Juliette Piquois",
                "Photographes : Coline Mazas, Thibaud Cambronne, Clément Daguenet"
            ],
            "prev_year_id": "p021"
        },
        {
            "year": "021",
            "year_id": "p021",
            "members": [
                "Présidente : Auriane Riou",
                "Vice-Présidente : Pauline Hubert",
                "Trésorière : Amélie Guyot",
                "Respos Communication : Paule-Claire He-Xie et Raphaël Lasry",
                "Respo Matériel : Benjamin Sauze",
                "Pôle montage : Marie Puistienne et Peio Betbeder",
                "Pôle photo : Maëlle Sardet, Jean-Sébastien Verhaeghe, Clément Norodom, Charlotte Nivelle, Pia Chancerel",
                "Pôle Créations originales : Augustin Doumic, Benjamin Roulin, Clément Allain, Pol Le-Gurun"
            ],
            "prev_year_id": "p020"
        },
        {
            "year": "020",
            "year_id": "p020",
            "members": [
                "Président : Thomas Chabal",
                "Vice-Présidente : Félicie Levinton",
                "Respo Images : Quentin Spinat",
                "Respo Matériel : Martin Graive",
                "Respos Communication : Candice Pichon et Nathan Godey",
                "Chefs monteur : Wissam Alami-Messaouidi et Jeffrey Mahou",
                "Directeur Photo : Philippe d'Harcourt",
                "Respo Web : Alexandre Perez",
                "Polaroïd : Clémence Barillot",
                "Respo International : Rolando Saavedra"
            ],
            "prev_year_id": "p019"
        },
        {
            "year": "019",
            "year_id": "p019",
            "members": [
                "Présidente : Inès Tazi",
                "Responsable Web : Philippe Ferreira de Sousa",
                "Membres : Francesca Carreiro, Victor Noisette, Thomas Benichou, Stephane Allado, Hugo Sénetaire, Anaïs Chopin, Louis Dumont"
            ],
            "prev_year_id": "p018"
        },
        {
            "year": "018",
            "year_id": "p018",
            "members": [
                "Président : Lucien Mauffret",
                "Vice-Président : Augustin Joncheray",
                "Secrétaire Général : Anatole Parre",
                "Photons : Victor Marchais, Nicolas Thery et Aurélie Shi",
                "Pixels : Alexandre Aheto, Felix Roubaud et Romain Durand"
            ],
            "prev_year_id": "p017"
        },
        {
            "year": "017",
            "year_id": "p017",
            "members": [
                "Président : Alban Berrube"
            ],
            "prev_year_id": "p016"
        },
        {
            "year": "016",
            "year_id": "p016",
            "members": [
                "Président : Omar Mounir Alaoui",
                "Réalisateur : Eliot Andres"
            ],
            "prev_year_id": "p015"
        },
        {
            "year": "015",
            "year_id": "p015",
            "members": [
                "Président : Geoffroy Gallier",
                "Membres : Mathieu Ramananarivo, Mickael Bergem, Chanh-Nghi Lam, Paul Chabas et Paul Boosz"
            ],
            "prev_year_id": ""
        }
    ]
};
  fragmentIntro = null;

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
    // /!\ TEMPORARY
    this.teamPonthe = this.teamPontheRaw.team_ponthe;
    console.log(this.teamPonthe)
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
      ? "0" + (parseInt(this.teamPonthe[0].year) + 1).toString()
      : "0" + (parseInt(this.teamPonthe[numberOfTeams - 1].year) - 1).toString();

    const emptyTeam = {
      "year": year,
      "year_id": "p" + year,
      "members": [""],
      "prev_year_id": "p0" + (parseInt(year) - 1).toString()
    };
    this.teamPonthe.splice(indexOfNewTeam, 0, emptyTeam);
  }

  addMember(teamIndex: number) {
    const membersList = this.teamPonthe[teamIndex].members;
    membersList.push("")
    this.teamPonthe[teamIndex].members = membersList
  }
  
  removeMember(teamIndex: number, memberIndex: number) {
    let membersList = this.teamPonthe[teamIndex].members;
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

  // Submission of gallery creation
  onSubmitEvent() {
    const teamJson = { 'team_ponthe': this.teamPonthe };
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
