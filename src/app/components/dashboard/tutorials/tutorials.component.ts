import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {
  tutorials = [];
  editMode = false;
  visibleConfirmModal = false;

  @Input() visible: boolean;
  @Output() close = new EventEmitter<{}>();

  constructor(private assetsService: AssetsService) { }

  ngOnInit(): void {
    this.getTutorials();
  }

  getTutorials() {
    this.assetsService.getAdminTutorials().subscribe(
      (res: object[]) => {
        this.tutorials = res;
      },
      (error) => { console.log(error); }
    );
  }

  closeTutos() {
    this.editMode = false;
    this.close.next();
  }

  editConfirmModal() {
    if (this.editMode === false) {
      this.editMode = true;
    } else {
      this.visibleConfirmModal = true;
    }
  }

  // Category
  addCategory(categoryIndex: number) {
    const indexOfNewCategory = categoryIndex === 0 ? 0 : categoryIndex;

    const emptyCategory = {
      title: '',
      content: []
    };
    this.tutorials.splice(indexOfNewCategory, 0, emptyCategory);
  }

  updateCategory(categoryIndex: number, e: Event) {
    // @ts-ignore
    this.tutorials[categoryIndex].title = e.target.value;
  }

  removeCategory(categoryIndex: number) {
    this.tutorials.splice(categoryIndex, 1);
  }


  closeConfirmModal() {
    this.visibleConfirmModal = false;
  }

  // Tutorials
  addTutorial(categoryIndex: number) {
    const tutorialsList = this.tutorials[categoryIndex].content;
    const emptyTutorial = { question: '', answer: '' };
    tutorialsList.push(emptyTutorial);
    this.tutorials[categoryIndex].content = tutorialsList;
  }

  removeTutorial(categoryIndex: number, tutorialIndex: number) {
    const tutorialsList = this.tutorials[categoryIndex].content;
    tutorialsList.splice(tutorialIndex, 1);
    this.tutorials[categoryIndex].content = tutorialsList;
    if (tutorialsList.length === 0) {
      this.tutorials.splice(categoryIndex, 1);
    }
  }

  // Content
  updateQuestion(categoryIndex: number, tutorialIndex: number, e: Event) {
    // @ts-ignore
    this.tutorials[categoryIndex].content[tutorialIndex].question = e.target.value;
  }

  updateAnswer(categoryIndex: number, tutorialIndex: number, e: Event) {
    // @ts-ignore
    this.tutorials[categoryIndex].content[tutorialIndex].answer = e.target.value;
  }

  onSubmitAdminTutorials() {
    this.assetsService.editAdminTutorials({ tutorials: this.tutorials }).subscribe(() => {});
    this.visibleConfirmModal = false;
    this.editMode = false;
  }
}
