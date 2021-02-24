import { Component, OnInit } from '@angular/core';

import { AssetsService } from 'src/app/services/assets.service';

const DURATION_DISPLAYING = 6000;

@Component({
  selector: 'app-cgu-edition-form',
  templateUrl: './cgu-edition-form.component.html',
  styleUrls: ['./cgu-edition-form.component.scss']
})
export class CguEditionFormComponent implements OnInit {
  // Create gallery form defined here
  articles = [];

  successEdition = false;
  failureEdition = false;
  visibleModal = false;

  constructor(private assetsService: AssetsService) { }

  ngOnInit() {
    this.getCGUs();
  }

  getCGUs() {
    this.assetsService.getCGU().subscribe(
      (res: { articles }) => {
        const len = Object.keys(res.articles).length;
        for (let i = 1; i < len + 1; i++) {
          this.articles.push(res.articles[i]);
        }
      },
      (error) => { console.error(error); }
    );
  }

  arrayToJson(articles: any) {
    let finalJson = {};
    for (let i = 1; i < articles.length + 1; i++) {
      finalJson[i] = articles[i];
    }
    finalJson = { articles: finalJson };
    return finalJson;
  }

  updateTitle(i: number, e: Event) {
    // @ts-ignore
    this.articles[i].title = e.target.value;
  }

  updateContent(i: number, e: Event) {
    // @ts-ignore
    this.articles[i].body = e.target.value;
  }

  addArticle(i: number) {
    this.articles.splice(i + 1, 0, { title: '', body: '' });
  }

  removeArticle(i: number) {
    this.articles.splice(i, 1);
  }

  openConfirmationModal() {
    this.visibleModal = true;
  }

  closeCancelModal() {
    this.visibleModal = false;
  }

  // Submission of gallery creation
  onSubmitEvent() {
    this.assetsService.editCgu(this.arrayToJson(this.articles)).subscribe(
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
