import { Component, OnInit } from '@angular/core';

import { AssetsService } from 'src/app/services/assets.service';
import { routesAppFromRoot } from '../../Routes';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {

  articles = [];
  routes = routesAppFromRoot;

  constructor(private assetsService: AssetsService) {
  }

  ngOnInit() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // Initial request for getting all the articles and storing them in "articles"
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
}
